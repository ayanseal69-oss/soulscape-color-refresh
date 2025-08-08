import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Plus, 
  FileText, 
  BarChart3, 
  MessageCircle, 
  DollarSign, 
  FileStack, 
  Layout, 
  Palette, 
  Settings, 
  Bookmark, 
  ExternalLink,
  Menu,
  X,
  Sun,
  Moon 
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("EN");
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === "EN" ? "বাং" : "EN";
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const translations = {
    EN: {
      title: "Skyscape",
      subtitle: "A Journey Within: Exploring Spirituality, Philosophy & Psychology",
      home: "Home",
      about: "About",
      contact: "Contact",
      newPost: "New Post",
      posts: "Posts",
      stats: "Stats",
      comments: "Comments",
      earnings: "Earnings",
      pages: "Pages",
      layout: "Layout",
      theme: "Theme",
      settings: "Settings",
      readingList: "Reading List",
      viewBlog: "View Blog",
      featuredReflections: "Featured Reflections",
      pathsOfExploration: "Paths of Exploration",
      spirituality: "Spirituality",
      philosophy: "Philosophy",
      psychology: "Psychology",
      beginJourney: "Begin Your Journey →",
      blogAddress: "Your blog address: skyscape.lovable.app",
      brandName: "Skyscape"
    },
    বাং: {
      title: "আকাশের দৃশ্যপট",
      subtitle: "অন্তর্যাত্রা: আধ্যাত্মিকতা, দর্শন ও মনোবিজ্ঞান অন্বেষণ",
      home: "হোম",
      about: "সম্পর্কে",
      contact: "যোগাযোগ",
      newPost: "নতুন পোস্ট",
      posts: "পোস্টসমূহ",
      stats: "পরিসংখ্যান",
      comments: "মন্তব্য",
      earnings: "আয়",
      pages: "পৃষ্ঠা",
      layout: "লেআউট",
      theme: "থিম",
      settings: "সেটিংস",
      readingList: "পঠন তালিকা",
      viewBlog: "ব্লগ দেখুন",
      featuredReflections: "বিশেষ প্রতিফলন",
      pathsOfExploration: "অন্বেষণের পথ",
      spirituality: "আধ্যাত্মিকতা",
      philosophy: "দর্শন",
      psychology: "মনোবিজ্ঞান",
      beginJourney: "আপনার যাত্রা শুরু করুন →",
      blogAddress: "আপনার ব্লগ ঠিকানা: skyscape.lovable.app",
      brandName: "আকাশের দৃশ্যপট"
    }
  };

  const t = translations[language];

  const navigationItems = [
    { icon: Plus, label: t.newPost, color: "text-primary", action: () => navigate("/new-post") },
    { icon: FileText, label: t.posts, color: "text-muted-foreground", action: () => console.log("Posts") },
    { icon: BarChart3, label: t.stats, color: "text-primary", action: () => navigate("/stats") },
    { icon: MessageCircle, label: t.comments, color: "text-muted-foreground", action: () => navigate("/comments") },
    { icon: DollarSign, label: t.earnings, color: "text-muted-foreground", action: () => navigate("/earnings") },
    { icon: FileStack, label: t.pages, color: "text-muted-foreground", action: () => console.log("Pages") },
    { icon: Layout, label: t.layout, color: "text-muted-foreground", action: () => console.log("Layout") },
    { icon: Palette, label: t.theme, color: "text-muted-foreground", action: () => console.log("Theme") },
    { icon: Settings, label: t.settings, color: "text-muted-foreground", action: () => console.log("Settings") },
    { icon: Bookmark, label: t.readingList, color: "text-muted-foreground", action: () => console.log("Reading List") },
    { icon: ExternalLink, label: t.viewBlog, color: "text-primary", action: () => console.log("View blog") },
  ];

  return (
    <div className="min-h-screen bg-gradient-sea relative">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-card/95 backdrop-blur-sm border-r border-border/50 z-50 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">RP</span>
              </div>
              <span className="text-card-foreground font-semibold">{t.brandName}</span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-card-foreground hover:text-primary"
            >
              <X size={20} />
            </button>
          </div>


          {/* Navigation Items */}
          <nav className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;
              return (
                  <button
                  key={index}
                  onClick={item.action}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left hover:bg-primary/10 transition-all duration-300 group border border-transparent hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                    <Icon size={16} className={`${item.color} group-hover:text-primary transition-colors duration-300`} />
                  </div>
                  <span className="text-card-foreground group-hover:text-primary font-medium transition-colors duration-300">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-64'}`}>
        {/* Header */}
        <header className="flex items-center justify-between p-6 bg-background/10 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden text-foreground hover:text-primary"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">RP</span>
              </div>
              <span className="text-foreground font-semibold">{t.brandName}</span>
            </div>
          </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors">{t.home}</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">{t.about}</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">{t.contact}</a>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="text-foreground hover:text-primary transition-colors p-2 rounded-lg hover:bg-primary/10"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={toggleLanguage}
            className="text-foreground hover:text-primary transition-colors text-sm font-medium px-3 py-2 rounded-lg hover:bg-primary/10 border border-border/50"
          >
            {language}
          </button>
          </div>
        </header>

      {/* Hero Section with Wave Effect */}
      <section className="relative min-h-[70vh] flex items-center justify-center text-center px-6">
        {/* Subtle Spiritual Symbols Background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-20 left-10 text-6xl">☯</div>
          <div className="absolute top-40 right-20 text-4xl">🧠</div>
          <div className="absolute bottom-40 left-20 text-5xl">∞</div>
          <div className="absolute bottom-20 right-10 text-4xl">🌀</div>
          <div className="absolute top-60 left-1/3 text-3xl">△</div>
          <div className="absolute bottom-60 right-1/3 text-3xl">◯</div>
        </div>

        {/* Wave Animation */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-wave opacity-60">
          <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path 
              d="M0,60 Q300,120 600,60 T1200,60 L1200,120 L0,120 Z" 
              fill="currentColor" 
              className="text-background/20 animate-pulse"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 drop-shadow-lg">
            {t.title}
          </h1>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
          <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20 max-w-md mx-auto mb-8">
            <p className="text-primary font-medium text-lg">{t.blogAddress}</p>
          </div>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-6 h-6 rounded-full bg-primary/30 animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-primary/50 animate-pulse delay-100"></div>
          </div>
          <Button 
            size="lg" 
            className="bg-primary/90 hover:bg-primary text-primary-foreground shadow-wave transition-all duration-300 hover:shadow-spiritual"
          >
            {t.beginJourney}
          </Button>
        </div>
      </section>

      {/* Featured Reflections */}
      <section className="py-16 px-6 bg-background/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            {t.featuredReflections}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "The Future of Web Development",
                author: "John Doe",
                date: "2024-01-15",
                excerpt: "Exploring the latest trends and technologies shaping the web development landscape."
              },
              {
                title: "Minimalist Living: A Guide to Simplicity",
                author: "Jane Smith",
                date: "2024-01-12",
                excerpt: "Discover how minimalism can transform your life and bring more joy to everyday moments."
              },
              {
                title: "Hidden Gems of Europe",
                author: "Mike Johnson",
                date: "2024-01-10",
                excerpt: "Uncover the most beautiful and lesser-known destinations across European countries."
              }
            ].map((post, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50 hover:shadow-wave transition-all duration-300">
                <div className="h-48 bg-gradient-wave rounded-t-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/60"></div>
                  <div className="absolute bottom-4 left-4 text-card-foreground">
                    <div className="text-xs opacity-75">{post.author} • {post.date}</div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-card-foreground mb-3">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {post.excerpt}
                  </p>
                  <Button variant="secondary" size="sm">
                    {t.beginJourney.replace(' →', '')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Paths of Exploration */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            {t.pathsOfExploration}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: t.spirituality, 
                icon: "☯️", 
                articles: language === "EN" ? "24 articles" : "২৪টি নিবন্ধ",
                description: language === "EN" ? "Explore inner peace and connection through Advaita Vedanta" : "অদ্বৈত বেদান্তের মাধ্যমে অন্তর্শান্তি ও সংযোগ অন্বেষণ করুন"
              },
              { 
                title: t.philosophy, 
                icon: "🤔", 
                articles: language === "EN" ? "18 articles" : "১৮টি নিবন্ধ",
                description: language === "EN" ? "Question, think, and understand existence" : "প্রশ্ন করুন, চিন্তা করুন এবং অস্তিত্ব বুঝুন"
              },
              { 
                title: t.psychology, 
                icon: "🧠", 
                articles: language === "EN" ? "32 articles" : "৩২টি নিবন্ধ",
                description: language === "EN" ? "Understand the mind and behavior patterns" : "মন এবং আচরণের ধরন বুঝুন"
              }
            ].map((path, index) => (
              <Card key={index} className="text-center bg-card/60 backdrop-blur-sm border-border/50 hover:shadow-spiritual transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {path.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-2">
                    {path.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {path.articles}
                  </p>
                  <p className="text-muted-foreground">
                    {path.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Wave */}
      <footer className="relative bg-gradient-wave py-16 text-center">
        <svg className="absolute top-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path 
            d="M0,60 Q300,0 600,60 T1200,60 L1200,0 L0,0 Z" 
            fill="currentColor" 
            className="text-background/20"
          />
        </svg>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Blog</h4>
              <p className="text-foreground/70">Sharing stories and insights that matter</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Navigation</h4>
              <div className="space-y-2 text-foreground/70">
                <div>Home</div>
                <div>About</div>
                <div>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Categories</h4>
              <div className="space-y-2 text-foreground/70">
                <div>Technology</div>
                <div>Lifestyle</div>
                <div>Travel</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
              <div className="flex justify-center gap-4 text-xl">
                <span className="text-foreground/70 hover:text-foreground cursor-pointer">📘</span>
                <span className="text-foreground/70 hover:text-foreground cursor-pointer">🐦</span>
                <span className="text-foreground/70 hover:text-foreground cursor-pointer">📸</span>
                <span className="text-foreground/70 hover:text-foreground cursor-pointer">💼</span>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-foreground/20 text-foreground/60">
            © 2024 Blog. All rights reserved.
          </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
