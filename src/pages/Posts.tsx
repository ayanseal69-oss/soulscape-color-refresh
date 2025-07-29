import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  Calendar,
  FileText,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  tags: string[];
  category: string;
  status: string;
  createdAt: string;
}

const Posts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    setPosts(savedPosts);
  }, []);

  const handleDelete = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('blog-posts', JSON.stringify(updatedPosts));
    
    toast({
      title: "Post Deleted",
      description: "Blog post has been successfully deleted",
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || post.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "scheduled": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sea">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Manage Posts - Skyscape</h1>
          <Button 
            onClick={() => navigate("/new-post")}
            className="bg-primary hover:bg-primary/90"
          >
            <FileText size={16} className="mr-2" />
            New Post
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-card/80 backdrop-blur-sm border-border/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-muted-foreground" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-md bg-card/80 border border-border/50 text-foreground"
            >
              <option value="all">All Posts</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-6">
          {filteredPosts.length === 0 ? (
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="py-12 text-center">
                <FileText size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">No posts found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm || filterStatus !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "Start writing your first blog post"}
                </p>
                <Button onClick={() => navigate("/new-post")}>
                  Create New Post
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl text-card-foreground mb-2">{post.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                        <span className="capitalize">{post.category}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit3 size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.content.substring(0, 200)}...
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Posts;