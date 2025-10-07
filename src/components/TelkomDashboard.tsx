import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { 
  Smartphone, 
  Wifi, 
  CreditCard, 
  BarChart3, 
  Award,
  ArrowRight,
  TrendingUp,
  Calendar,
  Gift,
  PhoneCall
} from "lucide-react";

export function TelkomDashboard() {
  const quickActions = [
    {
      icon: Award,
      title: "Tap2win",
      description: "Play daily games and win prizes",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500"
    },
    {
      icon: PhoneCall,
      title: "Mo'Nice",
      description: "Top up and manage your account",
      color: "bg-gradient-to-br from-blue-500 to-cyan-500"
    },
    {
      icon: Calendar,
      title: "Buy airtime",
      description: "Quick airtime purchases",
      color: "bg-gradient-to-br from-green-500 to-emerald-500"
    },
    {
      icon: BarChart3,
      title: "Buy data",
      description: "Data bundles and packages",
      color: "bg-gradient-to-br from-purple-500 to-violet-500"
    },
    {
      icon: Wifi,
      title: "Home Internet",
      description: "Fibre and LTE packages",
      color: "bg-gradient-to-br from-red-500 to-pink-500"
    },
    {
      icon: CreditCard,
      title: "Pay account",
      description: "Settle your account balance",
      color: "bg-gradient-to-br from-indigo-500 to-blue-500"
    }
  ];

  const promoDeals = [
    {
      title: "iPhone 17 Pro",
      subtitle: "The ultimate Pro.",
      price: "R1 119",
      period: "PM x 36",
      image: "📱",
      gradient: "from-gray-900 to-black"
    },
    {
      title: "Samsung Galaxy S25 FE",
      subtitle: "Experience advanced AI with Galaxy AI",
      price: "R629",
      period: "PM x 36",
      image: "📱",
      gradient: "from-blue-600 to-purple-600"
    },
    {
      title: "HUAWEI Pura80 Pro",
      subtitle: "Ultra Chroma with free 15GB LTE data",
      price: "R879",
      period: "PM x 36",
      image: "📱",
      gradient: "from-emerald-500 to-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-20 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
            
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                iPhone 17 <span className="text-accent">Pro.</span> The ultimate Pro.
              </h1>
              <p className="text-xl text-gray-300">
                Available now from
              </p>
              <div className="text-4xl font-bold">
                R1 119<span className="text-lg font-normal">PM x 36</span>
              </div>
              <Button variant="telkom-cta" size="xl" className="text-lg">
                Buy now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="relative">
              <img
                src="/iphone-17-pro-hero.jpg"
                alt="iPhone 17 Pro"
                className="w-full max-w-md mx-auto rounded-3xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-400 opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 telkom-heading">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {quickActions.map((action, index) => (
              <Card key={index} className="telkom-card telkom-card-hover cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`w-16 h-16 rounded-2xl ${action.color} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{action.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Deals */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold telkom-heading">Deals of the month</h2>
            <Button variant="telkom-outline">
              View all deals
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promoDeals.map((deal, index) => (
              <Card key={index} className="telkom-card telkom-card-hover overflow-hidden">
                <div className={`h-48 bg-gradient-to-br ${deal.gradient} flex items-center justify-center text-6xl`}>
                  {deal.image}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{deal.title}</CardTitle>
                  <CardDescription className="text-base">{deal.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary">{deal.price}</span>
                    <span className="text-muted-foreground">{deal.period}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="telkom" className="flex-1">
                      Buy now
                    </Button>
                    <Button variant="telkom-outline" className="flex-1">
                      View deals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Fast Fibre Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold telkom-heading">
                <span className="text-primary">Fast fibre,</span> for all your needs.
              </h2>
              <p className="text-lg text-muted-foreground">
                Follow a DIY video, download forms and series-binge with your mates all day.
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">From R655</span>
                <span className="text-muted-foreground">PM x 12</span>
              </div>
              <div className="flex gap-4">
                <Button variant="telkom-cta" size="lg">
                  <TrendingUp className="w-5 h-5" />
                  Get connected
                </Button>
                <Button variant="telkom-outline" size="lg">
                  View packages
                </Button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-8xl">🌐</div>
              <div className="mt-4 space-y-2">
                <div className="h-2 bg-primary rounded-full w-full animate-pulse"></div>
                <div className="h-2 bg-accent rounded-full w-3/4 animate-pulse delay-75"></div>
                <div className="h-2 bg-muted rounded-full w-1/2 animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
