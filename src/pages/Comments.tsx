import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle, ThumbsUp, ThumbsDown, Reply, Trash2, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Comments = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("EN");

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const translations = {
    EN: {
      title: "Comments Management",
      allComments: "All Comments",
      pending: "Pending",
      approved: "Approved", 
      spam: "Spam",
      backToDashboard: "Back to Dashboard",
      approve: "Approve",
      reply: "Reply",
      delete: "Delete",
      noComments: "No comments yet",
      moderate: "Moderate",
      recentComments: "Recent Comments"
    },
    বাং: {
      title: "মন্তব্য ব্যবস্থাপনা",
      allComments: "সকল মন্তব্য",
      pending: "অপেক্ষামাণ",
      approved: "অনুমোদিত",
      spam: "স্প্যাম",
      backToDashboard: "ড্যাশবোর্ডে ফিরুন",
      approve: "অনুমোদন",
      reply: "উত্তর",
      delete: "মুছুন",
      noComments: "এখনো কোন মন্তব্য নেই",
      moderate: "পরিচালনা",
      recentComments: "সাম্প্রতিক মন্তব্য"
    }
  };

  const t = translations[language];

  const [comments, setComments] = useState([
    {
      id: 1,
      author: "John Doe",
      email: "john@example.com",
      content: "Great article! Really insightful and well written. Looking forward to more content like this.",
      post: "The Future of Web Development",
      date: "2024-01-15",
      status: "pending",
      likes: 12,
      avatar: "JD"
    },
    {
      id: 2,
      author: "Jane Smith",
      email: "jane@example.com", 
      content: "I found this perspective fascinating. Have you considered exploring the philosophical implications further?",
      post: "Minimalist Living Guide",
      date: "2024-01-14",
      status: "approved",
      likes: 8,
      avatar: "JS"
    },
    {
      id: 3,
      author: "Mike Johnson",
      email: "mike@example.com",
      content: "Thanks for sharing this. It really changed my perspective on the topic.",
      post: "Hidden Gems of Europe",
      date: "2024-01-13",
      status: "approved",
      likes: 5,
      avatar: "MJ"
    }
  ]);

  const [activeTab, setActiveTab] = useState("all");

  const filterComments = (status: string) => {
    if (status === "all") return comments;
    return comments.filter(comment => comment.status === status);
  };

  const updateCommentStatus = (id: number, newStatus: string) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, status: newStatus } : comment
    ));
  };

  const deleteComment = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">{t.pending}</Badge>;
      case "approved":
        return <Badge variant="default">{t.approved}</Badge>;
      case "spam":
        return <Badge variant="destructive">{t.spam}</Badge>;
      default:
        return null;
    }
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
              {t.backToDashboard}
            </Button>
            <h1 className="text-3xl font-bold text-foreground">{t.title}</h1>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { key: "all", label: t.allComments, count: comments.length },
            { key: "pending", label: t.pending, count: comments.filter(c => c.status === "pending").length },
            { key: "approved", label: t.approved, count: comments.filter(c => c.status === "approved").length }
          ].map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "outline"}
              onClick={() => setActiveTab(tab.key)}
              className="border-border/50 bg-card/80 backdrop-blur-sm"
            >
              {tab.label} ({tab.count})
            </Button>
          ))}
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {filterComments(activeTab).length === 0 ? (
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardContent className="p-8 text-center">
                <MessageCircle size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">{t.noComments}</p>
              </CardContent>
            </Card>
          ) : (
            filterComments(activeTab).map((comment) => (
              <Card key={comment.id} className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-card-foreground">{comment.author}</h4>
                          <p className="text-sm text-muted-foreground">{comment.email} • {comment.date}</p>
                        </div>
                        {getStatusBadge(comment.status)}
                      </div>
                      
                      <p className="text-card-foreground mb-3">{comment.content}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">
                            On: <strong>{comment.post}</strong>
                          </span>
                          <div className="flex items-center gap-1">
                            <ThumbsUp size={14} className="text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{comment.likes}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {comment.status === "pending" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateCommentStatus(comment.id, "approved")}
                              className="border-green-500/50 text-green-600 hover:bg-green-500/10"
                            >
                              <CheckCircle size={14} className="mr-1" />
                              {t.approve}
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-border/50"
                          >
                            <Reply size={14} className="mr-1" />
                            {t.reply}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteComment(comment.id)}
                            className="border-red-500/50 text-red-600 hover:bg-red-500/10"
                          >
                            <Trash2 size={14} className="mr-1" />
                            {t.delete}
                          </Button>
                        </div>
                      </div>
                    </div>
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

export default Comments;