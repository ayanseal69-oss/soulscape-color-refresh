import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  ThumbsUp, 
  MessageCircle, 
  Share2,
  TrendingUp,
  Calendar,
  Users,
  Globe
} from "lucide-react";

const Stats = () => {
  return (
    <div className="min-h-screen bg-gradient-sea">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Blog Statistics - Skyscape</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Eye size={16} />
                Total Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">12,547</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp size={12} />
                +15.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Users size={16} />
                Unique Visitors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">8,924</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp size={12} />
                +12.8% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <MessageCircle size={16} />
                Comments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">342</div>
              <p className="text-xs text-blue-600 flex items-center gap-1">
                <TrendingUp size={12} />
                +8.7% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Share2 size={16} />
                Shares
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">156</div>
              <p className="text-xs text-purple-600 flex items-center gap-1">
                <TrendingUp size={12} />
                +22.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Posts */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">Top Performing Posts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "The Art of Mindful Living", views: 2847, engagement: 89 },
                { title: "Finding Inner Peace Through Meditation", views: 2156, engagement: 76 },
                { title: "Psychology of Happiness", views: 1923, engagement: 82 },
                { title: "Spiritual Journey Begins Within", views: 1756, engagement: 71 },
                { title: "Philosophy of Modern Life", views: 1432, engagement: 68 }
              ].map((post, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/30">
                  <div className="flex-1">
                    <h4 className="font-medium text-card-foreground">{post.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {post.views.toLocaleString()} views
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={12} />
                        {post.engagement}% engagement
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary">#{index + 1}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Traffic Sources */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { source: "Direct", visitors: 3567, percentage: 40 },
                { source: "Google Search", visitors: 2491, percentage: 28 },
                { source: "Social Media", visitors: 1602, percentage: 18 },
                { source: "Referrals", visitors: 892, percentage: 10 },
                { source: "Email", visitors: 372, percentage: 4 }
              ].map((source, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-card-foreground font-medium">{source.source}</span>
                    <span className="text-muted-foreground">{source.visitors.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-background/30 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground text-right">
                    {source.percentage}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { action: "New comment on 'The Art of Mindful Living'", time: "2 hours ago", icon: MessageCircle },
                { action: "Post shared 15 times", time: "4 hours ago", icon: Share2 },
                { action: "Reached 1000 views on latest post", time: "1 day ago", icon: Eye },
                { action: "New subscriber joined", time: "2 days ago", icon: Users },
                { action: "Featured on external blog", time: "3 days ago", icon: Globe }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-background/20">
                  <activity.icon size={16} className="text-primary" />
                  <div className="flex-1">
                    <p className="text-sm text-card-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Monthly Insights */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground flex items-center gap-2">
                <Calendar size={16} />
                This Month's Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5">
                <div className="text-2xl font-bold text-primary mb-2">15</div>
                <p className="text-sm text-muted-foreground">Posts published this month</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 rounded-lg bg-background/30">
                  <div className="font-bold text-card-foreground">92%</div>
                  <p className="text-xs text-muted-foreground">Engagement Rate</p>
                </div>
                <div className="p-3 rounded-lg bg-background/30">
                  <div className="font-bold text-card-foreground">4.2min</div>
                  <p className="text-xs text-muted-foreground">Avg. Read Time</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium text-card-foreground">Top Performing Category:</p>
                <Badge className="bg-primary/10 text-primary">Spirituality</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Stats;