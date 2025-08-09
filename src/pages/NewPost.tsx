import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Image, 
  Bold, 
  Italic, 
  Link, 
  List, 
  Save,
  Eye,
  Play,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [category, setCategory] = useState("spirituality");
  const [status, setStatus] = useState("draft");
  const [showPreview, setShowPreview] = useState(false);
  const [editingDraftId, setEditingDraftId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load draft for editing if coming from drafts page
  useEffect(() => {
    const draftData = localStorage.getItem('draft-edit');
    if (draftData) {
      const draft = JSON.parse(draftData);
      setTitle(draft.title);
      setContent(draft.content);
      setTags(draft.tags.join(', '));
      setCategory(draft.category);
      setStatus(draft.status);
      setEditingDraftId(draft.id);
      
      // Clear the temporary edit data
      localStorage.removeItem('draft-edit');
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          insertImageAtCursor(`![${file.name}](${imageUrl})`);
        };
        reader.readAsDataURL(file);
      });
      
      toast({
        title: "Images Added",
        description: `${files.length} image(s) inserted into content`,
      });
    }
  };

  const insertImageAtCursor = (imageMarkdown: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = content.substring(0, start) + '\n' + imageMarkdown + '\n' + content.substring(end);
    
    setContent(newContent);
    
    // Set cursor position after the inserted image
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + imageMarkdown.length + 2;
      textarea.focus();
    }, 0);
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
    
    // Cleanup old URL
    URL.revokeObjectURL(imagePreviewUrls[index]);
    
    setSelectedImages(newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your post",
        variant: "destructive",
      });
      return;
    }
    
    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content for your post",
        variant: "destructive",
      });
      return;
    }

    // Convert images to base64 for storage
    const imageDataUrls: string[] = [];
    for (const image of selectedImages) {
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(image);
      });
      imageDataUrls.push(dataUrl);
    }

    const postData = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      images: imageDataUrls,
      category,
      status,
      createdAt: new Date().toISOString()
    };
    
    console.log("Saving post:", postData);
    
    // Save to localStorage for demo purposes
    const existingPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    
    let finalPost;
    if (editingDraftId) {
      // Update existing draft
      const postIndex = existingPosts.findIndex((post: any) => post.id === editingDraftId);
      if (postIndex !== -1) {
        finalPost = { ...existingPosts[postIndex], ...postData };
        existingPosts[postIndex] = finalPost;
      } else {
        finalPost = { ...postData, id: Date.now() };
        existingPosts.push(finalPost);
      }
    } else {
      // Create new post
      finalPost = { ...postData, id: Date.now() };
      existingPosts.push(finalPost);
    }
    
    localStorage.setItem('blog-posts', JSON.stringify(existingPosts));
    
    toast({
      title: "Post Saved",
      description: `Post "${title}" has been saved as ${status}`,
    });
    
    navigate("/");
  };

  const handlePublish = () => {
    setStatus("published");
    setTimeout(() => handleSave(), 100);
  };

  const handlePreview = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Please enter title and content to preview",
        variant: "destructive",
      });
      return;
    }
    
    setShowPreview(true);
  };

  const renderPreviewContent = () => {
    return content.split('\n').map((line, index) => {
      // Handle image markdown
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
      const match = line.match(imageRegex);
      
      if (match) {
        return (
          <img 
            key={index}
            src={match[2]} 
            alt={match[1]} 
            className="max-w-full h-auto my-4 rounded-lg"
          />
        );
      }
      
      return <p key={index} className="mb-2">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-sea">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Create New Post - Skyscape</h1>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handlePreview}
              className="border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card"
            >
              <Eye size={16} className="mr-2" />
              Preview
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setStatus("draft");
                setTimeout(() => handleSave(), 100);
              }} 
              className="border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card"
            >
              <Save size={16} className="mr-2" />
              Save Draft
            </Button>
            <Button onClick={handlePublish} className="bg-primary hover:bg-primary/90">
              <Play size={16} className="mr-2" />
              Publish Post
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-card-foreground">Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-card-foreground">Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your post title..."
                    className="mt-2 bg-background/50 border-border/50"
                  />
                </div>

                {/* Formatting Toolbar */}
                <div className="flex gap-2 p-2 border border-border/50 rounded-lg bg-background/30">
                  <Button variant="ghost" size="sm">
                    <Bold size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Italic size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Link size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <List size={16} />
                  </Button>
                  <div className="ml-auto">
                    <Button variant="ghost" size="sm" onClick={() => document.getElementById('image-upload')?.click()}>
                      <Image size={16} />
                    </Button>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="content" className="text-card-foreground">Content</Label>
                  <Textarea
                    ref={textareaRef}
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content here... Click the image icon to insert images at cursor position."
                    rows={15}
                    className="mt-2 bg-background/50 border-border/50 resize-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Tip: Click where you want to insert an image, then click the image icon
                  </p>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-card-foreground">Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tags" className="text-card-foreground">Tags</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="spirituality, philosophy, psychology"
                    className="mt-2 bg-background/50 border-border/50"
                  />
                  <p className="text-sm text-muted-foreground mt-1">Separate tags with commas</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-card-foreground">Category</Label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 rounded-md bg-background/50 border border-border/50 text-card-foreground"
                  >
                    <option value="spirituality">Spirituality</option>
                    <option value="philosophy">Philosophy</option>
                    <option value="psychology">Psychology</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-card-foreground">Status</Label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 rounded-md bg-background/50 border border-border/50 text-card-foreground"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-card-foreground">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Use clear, engaging titles</p>
                  <p>• Add relevant tags for better discovery</p>
                  <p>• Include images to enhance readability</p>
                  <p>• Preview before publishing</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Dialog */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {tags.split(',').filter(tag => tag.trim()).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                    {tag.trim()}
                  </span>
                ))}
              </div>
              <div className="prose prose-lg max-w-none">
                {renderPreviewContent()}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NewPost;