import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, Heart, MessageCircle, TrendingUp, Users, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Stats = () => {
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
      title: "Blog Statistics",
      overview: "Overview",
      totalViews: "Total Views",
      totalLikes: "Total Likes", 
      totalComments: "Total Comments",
      totalShares: "Total Shares",
      monthlyViews: "Monthly Views",
      engagement: "Engagement Rate",
      popularPosts: "Popular Posts",
      topCategories: "Top Categories",
      viewsToday: "Views Today",
      newFollowers: "New Followers",
      backToDashboard: "Back to Dashboard"
    },
    বাং: {
      title: "ব্লগ পরিসংখ্যান",
      overview: "সংক্ষিপ্ত বিবরণ",
      totalViews: "মোট ভিউ",
      totalLikes: "মোট লাইক",
      totalComments: "মোট মন্তব্য", 
      totalShares: "মোট শেয়ার",
      monthlyViews: "মাসিক ভিউ",
      engagement: "এনগেজমেন্ট রেট",
      popularPosts: "জনপ্রিয় পোস্ট",
      topCategories: "শীর্ষ বিভাগ",
      viewsToday: "আজকের ভিউ",
      newFollowers: "নতুন ফলোয়ার",
      backToDashboard: "ড্যাশবোর্ডে ফিরুন"
    }
  };

  const t = translations[language];

  const statsData = [
    { label: t.totalViews, value: "12,847", icon: Eye, color: "text-blue-500" },
    { label: t.totalLikes, value: "1,205", icon: Heart, color: "text-red-500" },
    { label: t.totalComments, value: "387", icon: MessageCircle, color: "text-green-500" },
    { label: t.totalShares, value: "594", icon: Share2, color: "text-purple-500" },
  ];

  const popularPosts = [
    { title: "The Future of Web Development", views: 2847, likes: 156 },
    { title: "Minimalist Living Guide", views: 2340, likes: 134 },
    { title: "Hidden Gems of Europe", views: 1956, likes: 89 },
  ];

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

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-card-foreground">{stat.value}</p>
                    </div>
                    <Icon size={24} className={stat.color} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Popular Posts */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">{t.popularPosts}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularPosts.map((post, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                    <div>
                      <p className="font-medium text-card-foreground">{post.title}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Eye size={14} />
                          {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart size={14} />
                          {post.likes}
                        </span>
                      </div>
                    </div>
                    <TrendingUp size={20} className="text-green-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Additional Stats */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">{t.engagement}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">8.5%</div>
                  <p className="text-muted-foreground">{t.engagement}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t.viewsToday}</span>
                    <span className="font-medium text-card-foreground">542</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t.monthlyViews}</span>
                    <span className="font-medium text-card-foreground">15,280</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">{t.newFollowers}</span>
                    <span className="font-medium text-card-foreground">+23</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stats;