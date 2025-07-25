import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Image, 
  Bold, 
  Italic, 
  Link, 
  List, 
  Save,
  Eye
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSave = () => {
    console.log("Saving post:", { title, content, tags, image: selectedImage });
    // Here you would typically save to a backend
    navigate("/");
  };

  const handlePreview = () => {
    console.log("Preview post:", { title, content, tags });
    // Here you would show a preview modal or navigate to preview page
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
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
              <Save size={16} className="mr-2" />
              Save Post
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

                {selectedImage && (
                  <div className="p-4 border border-border/50 rounded-lg bg-background/30">
                    <p className="text-sm text-muted-foreground mb-2">Selected Image:</p>
                    <p className="text-card-foreground">{selectedImage.name}</p>
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
                  <select className="w-full p-2 rounded-md bg-background/50 border border-border/50 text-card-foreground">
                    <option value="spirituality">Spirituality</option>
                    <option value="philosophy">Philosophy</option>
                    <option value="psychology">Psychology</option>
                    <option value="general">General</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-card-foreground">Status</Label>
                  <select className="w-full p-2 rounded-md bg-background/50 border border-border/50 text-card-foreground">
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