import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, DollarSign, TrendingUp, CreditCard, Wallet, Eye, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Earnings = () => {
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
      title: "Earnings & Monetization",
      totalEarnings: "Total Earnings",
      thisMonth: "This Month",
      lastMonth: "Last Month", 
      adRevenue: "Ad Revenue",
      donations: "Donations",
      subscriptions: "Subscriptions",
      backToDashboard: "Back to Dashboard",
      connectAds: "Connect Ad Network",
      setupDonations: "Setup Donations",
      monetizeContent: "Monetize Content",
      viewAnalytics: "View Analytics",
      revenueStreams: "Revenue Streams",
      performance: "Performance",
      setupRequired: "Setup Required",
      comingSoon: "Coming Soon",
      enableFeature: "Enable Feature"
    },
    বাং: {
      title: "আয় ও নগদীকরণ",
      totalEarnings: "মোট আয়",
      thisMonth: "এই মাস",
      lastMonth: "গত মাস",
      adRevenue: "বিজ্ঞাপন আয়",
      donations: "দান",
      subscriptions: "সাবস্ক্রিপশন",
      backToDashboard: "ড্যাশবোর্ডে ফিরুন",
      connectAds: "বিজ্ঞাপন নেটওয়ার্ক সংযুক্ত করুন",
      setupDonations: "দান সেটআপ করুন",
      monetizeContent: "বিষয়বস্তু নগদীকরণ",
      viewAnalytics: "অ্যানালিটিক্স দেখুন",
      revenueStreams: "রাজস্ব স্ট্রিম",
      performance: "কর্মক্ষমতা",
      setupRequired: "সেটআপ প্রয়োজন",
      comingSoon: "শীঘ্রই আসছে",
      enableFeature: "ফিচার সক্রিয় করুন"
    }
  };

  const t = translations[language];

  const earningsData = [
    { label: t.totalEarnings, value: "$0.00", icon: DollarSign, color: "text-green-500", trend: "+0%" },
    { label: t.thisMonth, value: "$0.00", icon: TrendingUp, color: "text-blue-500", trend: "+0%" },
    { label: t.adRevenue, value: "$0.00", icon: Eye, color: "text-purple-500", trend: "N/A" },
    { label: t.donations, value: "$0.00", icon: Star, color: "text-yellow-500", trend: "N/A" },
  ];

  const revenueStreams = [
    {
      title: t.adRevenue,
      description: "Connect Google AdSense or other ad networks",
      status: "setup",
      action: t.connectAds,
      icon: Eye,
      color: "text-purple-500"
    },
    {
      title: t.donations,
      description: "Enable reader donations and tips",
      status: "setup",
      action: t.setupDonations,
      icon: Star,
      color: "text-yellow-500"
    },
    {
      title: t.subscriptions,
      description: "Offer premium content subscriptions",
      status: "coming",
      action: t.comingSoon,
      icon: CreditCard,
      color: "text-blue-500"
    }
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

        {/* Earnings Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {earningsData.map((earning, index) => {
            const Icon = earning.icon;
            return (
              <Card key={index} className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{earning.label}</p>
                      <p className="text-2xl font-bold text-card-foreground">{earning.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{earning.trend}</p>
                    </div>
                    <Icon size={24} className={earning.color} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Streams */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">{t.revenueStreams}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {revenueStreams.map((stream, index) => {
                  const Icon = stream.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-background/30 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                          <Icon size={20} className={stream.color} />
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">{stream.title}</p>
                          <p className="text-sm text-muted-foreground">{stream.description}</p>
                        </div>
                      </div>
                      <Button
                        variant={stream.status === "setup" ? "default" : "outline"}
                        size="sm"
                        disabled={stream.status === "coming"}
                        className={stream.status === "coming" ? "opacity-50" : ""}
                      >
                        {stream.action}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Monetization Guide */}
          <Card className="bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-card-foreground">{t.monetizeContent}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="text-center p-6 border border-dashed border-border/50 rounded-lg">
                  <Wallet size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-card-foreground mb-2">
                    {t.setupRequired}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Connect monetization services to start earning from your content.
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full">
                      {t.connectAds}
                    </Button>
                    <Button variant="outline" className="w-full">
                      {t.setupDonations}
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-card-foreground">Tips for Success:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Quality content attracts more readers</li>
                    <li>• Consistent posting builds audience</li>
                    <li>• Engage with your community</li>
                    <li>• Optimize for search engines</li>
                    <li>• Share on social media</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Earnings;