import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Share2, 
  Heart, 
  MessageCircle,
  Eye
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  tags: string[];
  category: string;
  status: string;
  createdAt: string;
}

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const foundPost = savedPosts.find((p: BlogPost) => p.id === parseInt(id || '0'));
    setPost(foundPost || null);
  }, [id]);

  const renderContent = () => {
    if (!post) return null;
    
    return post.content.split('\n').map((line, index) => {
      // Handle image markdown
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
      const match = line.match(imageRegex);
      
      if (match) {
        return (
          <img 
            key={index}
            src={match[2]} 
            alt={match[1]} 
            className="max-w-full h-auto my-6 rounded-lg shadow-md"
          />
        );
      }
      
      // Handle headings
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mb-4 mt-8">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mb-3 mt-6">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-bold mb-2 mt-4">{line.substring(4)}</h3>;
      }
      
      // Handle bold text
      const boldText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const italicText = boldText.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      return (
        <p 
          key={index} 
          className="mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: italicText }}
        />
      );
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-sea flex items-center justify-center">
        <Card className="bg-card/80 backdrop-blur-sm border-border/50 max-w-md w-full">
          <CardContent className="py-12 text-center">
            <h2 className="text-xl font-bold text-card-foreground mb-2">Post Not Found</h2>
            <p className="text-muted-foreground mb-4">The blog post you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/")}>
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-sea">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-6 border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Button>
        </div>

        {/* Main Article */}
        <article>
          <Card className="bg-card/80 backdrop-blur-sm border-border/50 mb-8">
            <CardHeader className="pb-6">
              <div className="space-y-4">
                <Badge className="w-fit bg-primary/10 text-primary capitalize">
                  {post.category}
                </Badge>
                
                <CardTitle className="text-3xl md:text-4xl font-bold leading-tight text-card-foreground">
                  {post.title}
                </CardTitle>
                
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(post.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>1,247 views</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="prose prose-lg max-w-none text-card-foreground">
                {renderContent()}
              </div>
              
              <Separator className="my-8" />
              
              {/* Tags */}
              <div className="flex items-center gap-2 mb-6">
                <Tag size={16} className="text-muted-foreground" />
                <div className="flex gap-2 flex-wrap">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Engagement Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-border/50">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className={isLiked ? "text-red-500" : "text-muted-foreground"}
                  >
                    <Heart size={16} className={`mr-2 ${isLiked ? "fill-current" : ""}`} />
                    {isLiked ? "Liked" : "Like"}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle size={16} className="mr-2" />
                    Comment
                  </Button>
                </div>
                
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <Share2 size={16} className="mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Related Posts Section */}
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-card-foreground">Related Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Mock related posts */}
              {[
                { title: "The Art of Mindful Living", excerpt: "Discover the beauty of present moment awareness..." },
                { title: "Finding Inner Peace", excerpt: "A journey through meditation and self-discovery..." }
              ].map((relatedPost, index) => (
                <div key={index} className="p-4 rounded-lg bg-background/30 hover:bg-background/50 transition-colors cursor-pointer">
                  <h4 className="font-medium text-card-foreground mb-2">{relatedPost.title}</h4>
                  <p className="text-sm text-muted-foreground">{relatedPost.excerpt}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BlogPost;