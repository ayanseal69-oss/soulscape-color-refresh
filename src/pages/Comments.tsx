import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, 
  Reply, 
  Trash2, 
  Check, 
  X, 
  Search,
  Filter,
  Clock,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Comment {
  id: number;
  author: string;
  email: string;
  content: string;
  postTitle: string;
  timestamp: string;
  status: "pending" | "approved" | "spam";
  replies?: Comment[];
}

const Comments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyContent, setReplyContent] = useState("");

  // Mock comments data
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Sarah Johnson",
      email: "sarah@example.com",
      content: "This post really resonated with me. The insights about mindful living are exactly what I needed to hear today. Thank you for sharing your wisdom!",
      postTitle: "The Art of Mindful Living",
      timestamp: "2024-01-15T10:30:00Z",
      status: "approved"
    },
    {
      id: 2,
      author: "Michael Chen",
      email: "michael@example.com",
      content: "Could you elaborate more on the meditation techniques mentioned? I'm a beginner and would love some specific guidance.",
      postTitle: "Finding Inner Peace Through Meditation",
      timestamp: "2024-01-14T15:45:00Z",
      status: "pending"
    },
    {
      id: 3,
      author: "Anonymous",
      email: "spam@spam.com",
      content: "Check out this amazing offer! Click here for free stuff!!!",
      postTitle: "Psychology of Happiness",
      timestamp: "2024-01-13T08:20:00Z",
      status: "spam"
    },
    {
      id: 4,
      author: "Emma Wilson",
      email: "emma@example.com",
      content: "Your writing style is so engaging! I've shared this with my book club and we're planning to discuss it next week.",
      postTitle: "Spiritual Journey Begins Within",
      timestamp: "2024-01-12T20:15:00Z",
      status: "approved"
    }
  ]);

  const handleStatusChange = (commentId: number, newStatus: "approved" | "spam") => {
    setComments(prev => prev.map(comment => 
      comment.id === commentId ? { ...comment, status: newStatus } : comment
    ));
    
    toast({
      title: newStatus === "approved" ? "Comment Approved" : "Comment Marked as Spam",
      description: `Comment has been ${newStatus}`,
    });
  };

  const handleDelete = (commentId: number) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    
    toast({
      title: "Comment Deleted",
      description: "Comment has been permanently deleted",
      variant: "destructive",
    });
  };

  const handleReply = (commentId: number) => {
    if (!replyContent.trim()) return;
    
    // In a real app, this would send the reply
    toast({
      title: "Reply Sent",
      description: "Your reply has been posted",
    });
    
    setReplyingTo(null);
    setReplyContent("");
  };

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.postTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || comment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "spam": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return <Check size={12} />;
      case "pending": return <Clock size={12} />;
      case "spam": return <X size={12} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sea">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Comments Management - Skyscape</h1>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageCircle size={16} />
              {comments.length} Total Comments
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              {comments.filter(c => c.status === "pending").length} Pending
            </span>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={16} />
            <Input
              placeholder="Search comments..."
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
              <option value="all">All Comments</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="spam">Spam</option>
            </select>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.length === 0 ? (
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="py-12 text-center">
                <MessageCircle size={48} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">No comments found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || filterStatus !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "Comments from readers will appear here"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredComments.map((comment) => (
              <Card key={comment.id} className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User size={16} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-card-foreground">{comment.author}</h4>
                        <p className="text-sm text-muted-foreground">{comment.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(comment.status)}>
                        {getStatusIcon(comment.status)}
                        <span className="ml-1 capitalize">{comment.status}</span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">
                      On: <span className="font-medium">{comment.postTitle}</span>
                    </p>
                    <p className="text-card-foreground">{comment.content}</p>
                  </div>

                  {/* Comment Actions */}
                  <div className="flex items-center gap-2 mb-4">
                    {comment.status === "pending" && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusChange(comment.id, "approved")}
                          className="text-green-600 border-green-200 hover:bg-green-50"
                        >
                          <Check size={14} className="mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleStatusChange(comment.id, "spam")}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <X size={14} className="mr-1" />
                          Spam
                        </Button>
                      </>
                    )}
                    
                    {comment.status === "approved" && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setReplyingTo(comment.id)}
                      >
                        <Reply size={14} className="mr-1" />
                        Reply
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDelete(comment.id)}
                      className="text-destructive border-destructive/20 hover:bg-destructive/10"
                    >
                      <Trash2 size={14} className="mr-1" />
                      Delete
                    </Button>
                  </div>

                  {/* Reply Form */}
                  {replyingTo === comment.id && (
                    <div className="border-t pt-4 space-y-3">
                      <Textarea
                        placeholder="Write your reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows={3}
                        className="bg-background/50 border-border/50"
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handleReply(comment.id)}
                        >
                          Send Reply
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setReplyingTo(null);
                            setReplyContent("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Comments;