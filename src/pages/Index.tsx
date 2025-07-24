import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-sea">
      {/* Header */}
      <header className="flex items-center justify-between p-6 bg-background/10 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">RP</span>
          </div>
          <span className="text-foreground font-semibold">Reflective Paths</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors">Home</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">About</a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-4">
          <button className="text-foreground hover:text-primary transition-colors">🌞</button>
          <span className="text-foreground text-sm">EN</span>
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
            Reflective Paths
          </h1>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            A Journey Within: Exploring Spirituality, Philosophy & Psychology
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-6 h-6 rounded-full bg-primary/30 animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-primary/50 animate-pulse delay-100"></div>
          </div>
          <Button 
            size="lg" 
            className="bg-primary/90 hover:bg-primary text-primary-foreground shadow-wave transition-all duration-300 hover:shadow-spiritual"
          >
            Begin Your Journey →
          </Button>
        </div>
      </section>

      {/* Featured Reflections */}
      <section className="py-16 px-6 bg-background/5 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Featured Reflections
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
                    Begin Your Journey
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
            Paths of Exploration
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Spirituality", 
                icon: "🕉️", 
                articles: "24 articles",
                description: "Explore inner peace and connection"
              },
              { 
                title: "Philosophy", 
                icon: "🧠", 
                articles: "18 articles",
                description: "Question, think, and understand"
              },
              { 
                title: "Psychology", 
                icon: "🔮", 
                articles: "32 articles",
                description: "Understand the mind and behavior"
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
  );
};

export default Index;
