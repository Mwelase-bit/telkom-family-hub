import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Target,
  Users,
  BookOpen,
  Smartphone
} from "lucide-react";

export function UsageAnalytics() {
  // Mock analytics data
  const weeklyData = {
    studyTime: [4.2, 3.8, 4.5, 3.9, 4.1, 3.7, 5.2],
    screenTime: [6.8, 5.9, 7.2, 6.1, 6.4, 8.3, 7.1],
    blockedAttempts: [12, 8, 15, 6, 9, 23, 11]
  };

  const memberStats = [
    {
      name: "Emma",
      totalStudyTime: "26h 15m",
      avgDaily: "3h 45m",
      efficiency: 78,
      blockedAttempts: 23,
      favoriteApps: ["Khan Academy", "Duolingo", "Microsoft Teams"],
      improvement: "+12%"
    },
    {
      name: "Liam", 
      totalStudyTime: "18h 30m",
      avgDaily: "2h 38m",
      efficiency: 65,
      blockedAttempts: 41,
      favoriteApps: ["Scratch", "Calculator", "YouTube Kids"],
      improvement: "+8%"
    },
    {
      name: "Sophie",
      totalStudyTime: "35h 20m",
      avgDaily: "5h 3m",
      efficiency: 89,
      blockedAttempts: 12,
      favoriteApps: ["Adobe Reader", "Google Docs", "Spotify"],
      improvement: "+15%"
    }
  ];

  const insights = [
    {
      type: "success",
      icon: CheckCircle2,
      title: "Great Progress!",
      description: "Sophie has exceeded her daily study goals 6 out of 7 days this week.",
      action: "Continue current routine"
    },
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Attention Needed",
      description: "Liam has 41 blocked attempts this week, mostly during study hours.",
      action: "Review whitelist settings"
    },
    {
      type: "info",
      icon: TrendingUp,
      title: "Improvement Trend",
      description: "Emma's study efficiency improved by 12% compared to last week.",
      action: "Maintain momentum"
    },
    {
      type: "target",
      icon: Target,
      title: "Goal Achievement",
      description: "Family study time goal reached 94% this week - well done!",
      action: "Set higher targets"
    }
  ];

  const categoryBreakdown = [
    { name: "Educational Apps", time: "18h 45m", percentage: 47, color: "bg-blue-500" },
    { name: "Research & Reading", time: "12h 30m", percentage: 31, color: "bg-green-500" },
    { name: "Creative Tools", time: "5h 15m", percentage: 13, color: "bg-purple-500" },
    { name: "Communication", time: "3h 30m", percentage: 9, color: "bg-orange-500" }
  ];

  const getIconForType = (type: string) => {
    switch (type) {
      case "success": return CheckCircle2;
      case "warning": return AlertTriangle;
      case "info": return TrendingUp;
      case "target": return Target;
      default: return CheckCircle2;
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case "success": return "text-green-600 bg-green-50";
      case "warning": return "text-orange-600 bg-orange-50";
      case "info": return "text-blue-600 bg-blue-50";
      case "target": return "text-purple-600 bg-purple-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="telkom-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Usage Analytics & Reports
              </CardTitle>
              <CardDescription>
                Detailed insights into study patterns, app usage, and family digital habits.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="telkom-outline">
                <Calendar className="w-4 h-4" />
                Custom Range
              </Button>
              <Button variant="telkom">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="individual">Individual</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="telkom-card">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold">79h 45m</p>
                <p className="text-sm text-muted-foreground">Total Study Time</p>
                <Badge className="mt-1 bg-green-100 text-green-800">+12%</Badge>
              </CardContent>
            </Card>
            <Card className="telkom-card">
              <CardContent className="p-4 text-center">
                <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">3h 49m</p>
                <p className="text-sm text-muted-foreground">Daily Average</p>
                <Badge className="mt-1 bg-blue-100 text-blue-800">Excellent</Badge>
              </CardContent>
            </Card>
            <Card className="telkom-card">
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">76</p>
                <p className="text-sm text-muted-foreground">Blocked Attempts</p>
                <Badge className="mt-1 bg-orange-100 text-orange-800">-18%</Badge>
              </CardContent>
            </Card>
            <Card className="telkom-card">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-muted-foreground">Goal Achievement</p>
                <Badge className="mt-1 bg-purple-100 text-purple-800">Outstanding</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Trends Chart */}
          <Card className="telkom-card">
            <CardHeader>
              <CardTitle>Weekly Trends</CardTitle>
              <CardDescription>Study time, screen time, and blocked attempts over the past week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Study Time Chart */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Study Time (hours)
                  </h4>
                  <div className="flex items-end gap-2 h-32">
                    {weeklyData.studyTime.map((hours, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-blue-500 rounded-t transition-all duration-300 hover:bg-blue-600"
                          style={{ height: `${(hours / 8) * 100}%`, minHeight: '8px' }}
                        ></div>
                        <span className="text-xs text-muted-foreground">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>0h</span>
                    <span>4h</span>
                    <span>8h</span>
                  </div>
                </div>

                {/* Blocked Attempts Chart */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-orange-600" />
                    Blocked Attempts
                  </h4>
                  <div className="flex items-end gap-2 h-20">
                    {weeklyData.blockedAttempts.map((attempts, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-orange-500 rounded-t transition-all duration-300 hover:bg-orange-600"
                          style={{ height: `${(attempts / 25) * 100}%`, minHeight: '4px' }}
                        ></div>
                        <span className="text-xs text-muted-foreground">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual" className="space-y-6">
          <div className="grid gap-6">
            {memberStats.map((member, index) => (
              <Card key={index} className="telkom-card">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <CardTitle>{member.name}'s Analytics</CardTitle>
                      <CardDescription>Weekly performance and usage patterns</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">Total Study Time</h4>
                      <p className="text-2xl font-bold">{member.totalStudyTime}</p>
                      <Badge className="bg-green-100 text-green-800">{member.improvement}</Badge>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Daily Average</h4>
                      <p className="text-2xl font-bold">{member.avgDaily}</p>
                      <p className="text-sm text-muted-foreground">Consistent effort</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Efficiency Score</h4>
                      <p className="text-2xl font-bold">{member.efficiency}%</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${member.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Blocked Attempts</h4>
                      <p className="text-2xl font-bold">{member.blockedAttempts}</p>
                      <p className="text-sm text-muted-foreground">This week</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Most Used Apps</h4>
                    <div className="flex gap-2 flex-wrap">
                      {member.favoriteApps.map((app, appIndex) => (
                        <Badge key={appIndex} variant="secondary">{app}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {insights.map((insight, index) => {
              const IconComponent = getIconForType(insight.type);
              return (
                <Card key={index} className="telkom-card">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getColorForType(insight.type)}`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold">{insight.title}</h3>
                        <p className="text-muted-foreground">{insight.description}</p>
                        <Button variant="telkom-outline" size="sm">
                          {insight.action}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Suggestions */}
          <Card className="telkom-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                AI-Powered Suggestions
              </CardTitle>
              <CardDescription>Recommendations based on usage patterns and goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Optimize Study Schedule</h4>
                <p className="text-blue-800 text-sm mt-1">
                  Consider moving Emma's study time to 2-4 PM when her efficiency peaks at 89%.
                </p>
              </div>
              <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Reward Achievement</h4>
                <p className="text-green-800 text-sm mt-1">
                  Sophie has exceeded weekly goals - consider unlocking a bonus entertainment app for weekends.
                </p>
              </div>
              <div className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900">Adjust Restrictions</h4>
                <p className="text-orange-800 text-sm mt-1">
                  Liam's blocked attempts suggest current restrictions may be too strict for his age group.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card className="telkom-card">
            <CardHeader>
              <CardTitle>App Category Breakdown</CardTitle>
              <CardDescription>Time spent across different app categories this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryBreakdown.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{category.name}</h4>
                      <span className="text-sm text-muted-foreground">{category.time}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${category.color} h-3 rounded-full transition-all duration-300`}
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground">{category.percentage}% of total study time</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Usage */}
          <Card className="telkom-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Device Usage Patterns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <Smartphone className="w-12 h-12 text-primary mx-auto" />
                  <h4 className="font-medium">Mobile Devices</h4>
                  <p className="text-2xl font-bold">45h 30m</p>
                  <p className="text-sm text-muted-foreground">57% of total time</p>
                </div>
                <div className="text-center space-y-2">
                  <Users className="w-12 h-12 text-blue-600 mx-auto" />
                  <h4 className="font-medium">Tablets</h4>
                  <p className="text-2xl font-bold">24h 15m</p>
                  <p className="text-sm text-muted-foreground">30% of total time</p>
                </div>
                <div className="text-center space-y-2">
                  <BarChart3 className="w-12 h-12 text-green-600 mx-auto" />
                  <h4 className="font-medium">Computers</h4>
                  <p className="text-2xl font-bold">10h 00m</p>
                  <p className="text-sm text-muted-foreground">13% of total time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}