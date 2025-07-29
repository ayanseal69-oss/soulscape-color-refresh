import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Eye,
  BarChart3,
  Plus,
  Settings,
  ExternalLink
} from "lucide-react";

const Earnings = () => {
  return (
    <div className="min-h-screen bg-gradient-sea">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Earnings & Monetization - Skyscape</h1>
        
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <DollarSign size={16} />
                Total Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$127.50</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <TrendingUp size={12} />
                +24.3% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Calendar size={16} />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$45.20</div>
              <p className="text-xs text-muted-foreground">
                23 days remaining
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BarChart3 size={16} />
                RPM (Revenue per Mille)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$2.85</div>
              <p className="text-xs text-blue-600 flex items-center gap-1">
                <TrendingUp size={12} />
                Industry average: $1.50
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Monetization Options */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">Monetization Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Google AdSense",
                  status: "Connected",
                  earnings: "$89.30",
                  description: "Display ads automatically placed on your blog",
                  color: "bg-green-100 text-green-800"
                },
                {
                  title: "Affiliate Marketing",
                  status: "Setup Required",
                  earnings: "$0.00",
                  description: "Earn commissions by promoting relevant products",
                  color: "bg-yellow-100 text-yellow-800"
                },
                {
                  title: "Sponsored Posts",
                  status: "Available",
                  earnings: "$38.20",
                  description: "Partner with brands for sponsored content",
                  color: "bg-blue-100 text-blue-800"
                },
                {
                  title: "Donations/Tips",
                  status: "Setup Required",
                  earnings: "$0.00",
                  description: "Accept donations from readers who appreciate your content",
                  color: "bg-purple-100 text-purple-800"
                }
              ].map((option, index) => (
                <div key={index} className="p-4 rounded-lg bg-background/30 border border-border/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">{option.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={option.color}>
                        {option.status}
                      </Badge>
                      <p className="text-sm font-bold text-card-foreground mt-1">{option.earnings}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {option.status === "Connected" ? (
                      <Button size="sm" variant="outline">
                        <Settings size={14} className="mr-1" />
                        Manage
                      </Button>
                    ) : (
                      <Button size="sm">
                        <Plus size={14} className="mr-1" />
                        Setup
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <ExternalLink size={14} className="mr-1" />
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">Performance Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Top Earning Posts */}
              <div>
                <h4 className="font-medium text-card-foreground mb-3">Top Earning Posts</h4>
                <div className="space-y-3">
                  {[
                    { title: "The Art of Mindful Living", earnings: "$24.50", views: "2,847" },
                    { title: "Finding Inner Peace Through Meditation", earnings: "$18.30", views: "2,156" },
                    { title: "Psychology of Happiness", earnings: "$15.70", views: "1,923" }
                  ].map((post, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                      <div className="flex-1">
                        <p className="font-medium text-card-foreground text-sm">{post.title}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <Eye size={10} />
                          {post.views} views
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{post.earnings}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue Breakdown */}
              <div>
                <h4 className="font-medium text-card-foreground mb-3">Revenue Sources</h4>
                <div className="space-y-2">
                  {[
                    { source: "Display Ads", amount: "$89.30", percentage: 70 },
                    { source: "Sponsored Content", amount: "$38.20", percentage: 30 },
                    { source: "Affiliate Sales", amount: "$0.00", percentage: 0 }
                  ].map((source, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-card-foreground">{source.source}</span>
                        <span className="font-bold text-card-foreground">{source.amount}</span>
                      </div>
                      <div className="w-full bg-background/30 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Optimization Tips */}
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                  <TrendingUp size={16} />
                  Optimization Tips
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Write longer, in-depth articles to increase ad revenue</li>
                  <li>• Focus on high-traffic topics in your niche</li>
                  <li>• Optimize page load speed for better ad performance</li>
                  <li>• Consider premium ad placements for higher RPM</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-background/30">
                <h4 className="font-medium text-card-foreground mb-2">Next Payment</h4>
                <div className="text-2xl font-bold text-primary mb-1">$45.20</div>
                <p className="text-sm text-muted-foreground">Expected on February 21, 2024</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-card-foreground">Payment History</h4>
                {[
                  { date: "Jan 21, 2024", amount: "$82.15", status: "Paid" },
                  { date: "Dec 21, 2023", amount: "$67.30", status: "Paid" },
                  { date: "Nov 21, 2023", amount: "$45.80", status: "Paid" }
                ].map((payment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/20">
                    <div>
                      <p className="font-medium text-card-foreground">{payment.amount}</p>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {payment.status}
                    </Badge>
                  </div>
                ))}
              </div>

              <Button className="w-full" variant="outline">
                <Settings size={16} className="mr-2" />
                Update Payment Settings
              </Button>
            </CardContent>
          </Card>

          {/* Growth Recommendations */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">Growth Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Enable Email Newsletter",
                  description: "Build a subscriber list to increase recurring traffic",
                  impact: "High Impact",
                  color: "text-green-600"
                },
                {
                  title: "SEO Optimization",
                  description: "Improve search rankings to get more organic traffic",
                  impact: "High Impact",
                  color: "text-green-600"
                },
                {
                  title: "Social Media Integration",
                  description: "Connect social accounts to drive more traffic",
                  impact: "Medium Impact",
                  color: "text-yellow-600"
                },
                {
                  title: "Guest Posting",
                  description: "Write for other blogs to expand your audience",
                  impact: "Medium Impact",
                  color: "text-yellow-600"
                }
              ].map((recommendation, index) => (
                <div key={index} className="p-4 rounded-lg bg-background/30 border border-border/30">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-card-foreground">{recommendation.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{recommendation.description}</p>
                    </div>
                    <Badge className={`${recommendation.color} bg-transparent border`}>
                      {recommendation.impact}
                    </Badge>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2">
                    Learn More
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Earnings;