import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft, 
  Image, 
  Bold, 
  Italic, 
  Link, 
  List, 
  Save,
  Eye,
  Send,
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const newImages = [...selectedImages, ...files];
      setSelectedImages(newImages);
      
      // Create preview URLs for new images
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setImagePreviewUrls(prev => [...prev, ...newPreviewUrls]);
      
      toast({
        title: "Images Added",
        description: `${files.length} image(s) added successfully`,
      });
    }
  };

  const removeImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviewUrls = imagePreviewUrls.filter((_, i) => i !== index);
    
    // Cleanup old URL
    URL.revokeObjectURL(imagePreviewUrls[index]);
    
    setSelectedImages(newImages);
    setImagePreviewUrls(newPreviewUrls);
  };

  const handleSave = () => {
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

    const postData = {
      title,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      images: selectedImages,
      category,
      status,
      createdAt: new Date().toISOString()
    };
    
    console.log("Saving post:", postData);
    
    // Save to localStorage for demo purposes
    const existingPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const newPost = { ...postData, id: Date.now() };
    existingPosts.push(newPost);
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
    
    console.log("Preview post:", { title, content, tags, images: selectedImages });
    toast({
      title: "Preview",
      description: "Preview functionality would open here",
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
            <h1 className="text-2xl font-bold text-foreground">Create New Post</h1>
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
              onClick={handleSave} 
              className="border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card"
            >
              <Save size={16} className="mr-2" />
              Save Draft
            </Button>
            <Button onClick={handlePublish} className="bg-primary hover:bg-primary/90">
              <Send size={16} className="mr-2" />
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
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your post content here..."
                    rows={15}
                    className="mt-2 bg-background/50 border-border/50 resize-none"
                  />
                </div>

                {selectedImages.length > 0 && (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Attached Images ({selectedImages.length}):</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {imagePreviewUrls.map((url, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={url}
                            alt={selectedImages[index].name}
                            className="w-full h-32 object-cover rounded-lg border border-border/50"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={16} />
                          </button>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {selectedImages[index].name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
      </div>
    </div>
  );
};

export default NewPost;