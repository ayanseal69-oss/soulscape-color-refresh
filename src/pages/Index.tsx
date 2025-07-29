import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool, 
  BarChart3, 
  MessageSquare, 
  DollarSign, 
  FileText, 
  Layout,
  Palette,
  Settings,
  ExternalLink,
  BookOpen,
  Moon,
  Sun,
  Languages,
  Home,
  Eye,
  Star,
  TrendingUp,
  Calendar,
  User,
  Clock,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useTheme } from "next-themes";

interface BlogPost {
  id: number;
  title: string;
  content: string;
  tags: string[];
  category: string;
  status: string;
  createdAt: string;
}

const menuItems = [
  { title: "New Post", url: "/new-post", icon: PenTool, englishTitle: "New Post", banglaTitle: "নতুন পোস্ট" },
  { title: "Posts", url: "/posts", icon: FileText, englishTitle: "Posts", banglaTitle: "পোস্ট সমূহ" },
  { title: "Stats", url: "/stats", icon: BarChart3, englishTitle: "Stats", banglaTitle: "পরিসংখ্যান" },
  { title: "Comments", url: "/comments", icon: MessageSquare, englishTitle: "Comments", banglaTitle: "মন্তব্য" },
  { title: "Earnings", url: "/earnings", icon: DollarSign, englishTitle: "Earnings", banglaTitle: "আয়" },
  { title: "Pages", url: "/pages", icon: Layout, englishTitle: "Pages", banglaTitle: "পেজ সমূহ" },
  { title: "Layout", url: "/layout", icon: Layout, englishTitle: "Layout", banglaTitle: "লেআউট" },
  { title: "Theme", url: "/theme", icon: Palette, englishTitle: "Theme", banglaTitle: "থিম" },
  { title: "Settings", url: "/settings", icon: Settings, englishTitle: "Settings", banglaTitle: "সেটিংস" },
  { title: "View Blog", url: "/view-blog", icon: ExternalLink, englishTitle: "View Blog", banglaTitle: "ব্লগ দেখুন" },
  { title: "Reading List", url: "/reading-list", icon: BookOpen, englishTitle: "Reading List", banglaTitle: "পঠন তালিকা" },
];

const Index = () => {
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState<"en" | "bn">("en");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [showAllPosts, setShowAllPosts] = useState(false);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('blog-posts') || '[]');
    const publishedPosts = savedPosts.filter((post: BlogPost) => post.status === 'published');
    setPosts(publishedPosts.sort((a: BlogPost, b: BlogPost) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ));
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === "en" ? "bn" : "en");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const getExcerpt = (content: string, maxLength: number = 150) => {
    const textContent = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '').trim();
    return textContent.length > maxLength 
      ? textContent.substring(0, maxLength) + '...' 
      : textContent;
  };

  const displayedPosts = showAllPosts ? posts : posts.slice(0, 3);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-sea">
        <Sidebar className="w-60" collapsible="icon">
          <SidebarTrigger className="m-2 self-end" />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-card-foreground">
                {language === "en" ? "Skyscape Dashboard" : "স্কাইস্কেপ ড্যাশবোর্ড"}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <button
                          onClick={() => navigate(item.url)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-primary/10 transition-all duration-300"
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{language === "en" ? item.englishTitle : item.banglaTitle}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        {/* Header */}
        <header className="fixed top-0 right-0 left-0 z-30 flex items-center justify-between p-4 bg-background/10 backdrop-blur-sm border-b border-border/50">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-xl font-bold text-foreground">
              {language === "en" ? "Skyscape" : "স্কাইস্কেপ"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-foreground hover:text-primary"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-foreground hover:text-primary font-medium"
            >
              <Languages size={16} className="mr-1" />
              {language === "en" ? "EN" : "বাং"}
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 pt-20">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {language === "en" ? "Welcome to Skyscape" : "স্কাইস্কেপে স্বাগতম"}
              </h1>
              <p className="text-xl text-muted-foreground">
                {language === "en" 
                  ? "Your platform for sharing thoughts, insights, and inspiration" 
                  : "আপনার চিন্তাভাবনা, অন্তর্দৃষ্টি এবং অনুপ্রেরণা ভাগ করার প্ল্যাটফর্ম"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {language === "en" 
                  ? "Visit your blog at: skyscape.lovable.app" 
                  : "আপনার ব্লগ দেখুন: skyscape.lovable.app"}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">{posts.length}</p>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "Total Posts" : "মোট পোস্ট"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <Eye className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">8.2K</p>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "Total Views" : "মোট দর্শক"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <MessageSquare className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">147</p>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "Comments" : "মন্তব্য"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-500/10 rounded-lg">
                      <Star className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-card-foreground">4.8</p>
                      <p className="text-sm text-muted-foreground">
                        {language === "en" ? "Avg Rating" : "গড় রেটিং"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Posts */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center justify-between">
                  <span>{language === "en" ? "Recent Blog Posts" : "সাম্প্রতিক ব্লগ পোস্ট"}</span>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate("/new-post")}
                    className="border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card"
                  >
                    <PenTool size={16} className="mr-2" />
                    {language === "en" ? "New Post" : "নতুন পোস্ট"}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {posts.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText size={48} className="mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium text-card-foreground mb-2">
                      {language === "en" ? "No posts yet" : "এখনো কোন পোস্ট নেই"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {language === "en" 
                        ? "Start by creating your first blog post" 
                        : "আপনার প্রথম ব্লগ পোস্ট তৈরি করে শুরু করুন"}
                    </p>
                    <Button onClick={() => navigate("/new-post")}>
                      {language === "en" ? "Create First Post" : "প্রথম পোস্ট তৈরি করুন"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {displayedPosts.map((post) => (
                      <div 
                        key={post.id} 
                        className="p-6 rounded-lg bg-background/30 hover:bg-background/50 transition-colors cursor-pointer"
                        onClick={() => navigate(`/blog/${post.id}`)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-card-foreground mb-2 hover:text-primary transition-colors">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(post.createdAt).toLocaleDateString()}
                              </div>
                              <div className="flex items-center gap-1">
                                <User size={14} />
                                Admin
                              </div>
                              <Badge className="bg-primary/10 text-primary capitalize">
                                {post.category}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground mb-4 leading-relaxed">
                              {getExcerpt(post.content)}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2 flex-wrap">
                                {post.tags.slice(0, 3).map((tag, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                                {post.tags.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{post.tags.length - 3} more
                                  </Badge>
                                )}
                              </div>
                              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                                {language === "en" ? "Read More" : "আরও পড়ুন"}
                                <ArrowRight size={14} className="ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {posts.length > 3 && (
                      <div className="text-center pt-4">
                        <Button 
                          variant="outline"
                          onClick={() => setShowAllPosts(!showAllPosts)}
                          className="border-border/50 bg-card/80 backdrop-blur-sm hover:bg-card"
                        >
                          {showAllPosts 
                            ? (language === "en" ? "Show Less" : "কম দেখান")
                            : (language === "en" ? `View All ${posts.length} Posts` : `সব ${posts.length}টি পোস্ট দেখুন`)
                          }
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;