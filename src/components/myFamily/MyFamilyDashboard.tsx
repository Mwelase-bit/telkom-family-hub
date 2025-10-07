import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  Users,
  Shield,
  BookOpen,
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  UserPlus,
  Bot,
  Sparkles,
  Trash2,
  Play,
  Pause,
  Settings,
  Globe,
  Timer,
  UserMinus,
  Plus
} from "lucide-react";

import { BlueMode } from "./WhitelistManager";

interface FamilyMember {
  id: number;
  name: string;
  age: number;
  device: string;
  isBlueModeActive: boolean;
  blueModeStartTime: Date | null;
  todayBlueModeTime: string;
  allowedWebsites: string[];
  status: 'active' | 'inactive' | 'blue-mode';
}

interface MyFamilyDashboardProps {
  onBackClick: () => void;
}

export function MyFamilyDashboard({ onBackClick }: MyFamilyDashboardProps) {
  const [activeTab, setActiveTab] = useState("bluemode");
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: 1,
      name: "Emma",
      age: 14,
      device: "Samsung Galaxy A54",
      isBlueModeActive: true,
      blueModeStartTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      todayBlueModeTime: "2h 15m",
      allowedWebsites: ["khan-academy.org", "duolingo.com", "wikipedia.org"],
      status: "blue-mode"
    },
    {
      id: 2,
      name: "Liam",
      age: 11,
      device: "iPad Air",
      isBlueModeActive: false,
      blueModeStartTime: null,
      todayBlueModeTime: "0h 45m",
      allowedWebsites: ["scratch.mit.edu", "coolmathgames.com"],
      status: "inactive"
    },
    {
      id: 3,
      name: "Sophie",
      age: 16,
      device: "iPhone 15",
      isBlueModeActive: true,
      blueModeStartTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      todayBlueModeTime: "4h 30m",
      allowedWebsites: ["coursera.org", "edx.org", "youtube.com/education"],
      status: "blue-mode"
    }
  ]);

  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberAge, setNewMemberAge] = useState("");
  const [newMemberDevice, setNewMemberDevice] = useState("");
  const [isAISuggestionsOpen, setIsAISuggestionsOpen] = useState(false);
  const [selectedMemberForAI, setSelectedMemberForAI] = useState<FamilyMember | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoadingAISuggestions, setIsLoadingAISuggestions] = useState(false);

  // Update Blue Mode timers every second
  useEffect(() => {
    const interval = setInterval(() => {
      setFamilyMembers(members =>
        members.map(member => {
          if (member.isBlueModeActive && member.blueModeStartTime) {
            const now = new Date();
            const diffMs = now.getTime() - member.blueModeStartTime.getTime();
            const hours = Math.floor(diffMs / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

            return {
              ...member,
              todayBlueModeTime: `${hours}h ${minutes}m`
            };
          }
          return member;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addFamilyMember = () => {
    if (newMemberName && newMemberAge && newMemberDevice) {
      const newMember: FamilyMember = {
        id: Date.now(),
        name: newMemberName,
        age: parseInt(newMemberAge),
        device: newMemberDevice,
        isBlueModeActive: false,
        blueModeStartTime: null,
        todayBlueModeTime: "0h 0m",
        allowedWebsites: [],
        status: "inactive"
      };

      setFamilyMembers([...familyMembers, newMember]);
      setNewMemberName("");
      setNewMemberAge("");
      setNewMemberDevice("");
      setIsAddMemberOpen(false);
    }
  };

  const removeFamilyMember = (id: number) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  const toggleBlueMode = (id: number) => {
    setFamilyMembers(members =>
      members.map(member => {
        if (member.id === id) {
          const now = new Date();
          return {
            ...member,
            isBlueModeActive: !member.isBlueModeActive,
            blueModeStartTime: !member.isBlueModeActive ? now : null,
            status: !member.isBlueModeActive ? 'blue-mode' : 'inactive'
          };
        }
        return member;
      })
    );
  };

  const getTotalBlueModeTime = () => {
    return familyMembers
      .filter(member => member.isBlueModeActive)
      .reduce((total, member) => {
        const [hours, minutes] = member.todayBlueModeTime.split('h ').map(t => parseInt(t.replace('m', '')));
        return total + hours * 60 + minutes;
      }, 0);
  };

  const formatTotalTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const activeMembers = familyMembers.filter(member => member.isBlueModeActive);
  const totalActiveTime = formatTotalTime(getTotalBlueModeTime());

  // AI Suggestions functionality
  const getAISuggestions = async (member: FamilyMember) => {
    setIsLoadingAISuggestions(true);
    setSelectedMemberForAI(member);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const suggestions: string[] = [];

    // AI suggestions based on age and current websites
    if (member.age <= 12) {
      // Kid-friendly educational and game sites
      suggestions.push(
        'pbskids.org', 'abcya.com', 'coolmathgames.com', 'nationalgeographic.com/kids',
        'funbrain.com', 'starfall.com', 'sesamestreet.org'
      );
    } else if (member.age <= 16) {
      // Teen educational and creative sites
      suggestions.push(
        'khan-academy.org', 'duolingo.com', 'scratch.mit.edu', 'code.org',
        'quizlet.com', 'coursera.org', 'edx.org'
      );
    } else {
      // Advanced educational and professional development
      suggestions.push(
        'coursera.org', 'edx.org', 'udacity.com', 'linkedin.com/learning',
        'masterclass.com', 'skillshare.com', 'pluralsight.com'
      );
    }

    // Filter out already allowed websites
    const filteredSuggestions = suggestions.filter(site =>
      !member.allowedWebsites.includes(site)
    );

    setAiSuggestions(filteredSuggestions);
    setIsLoadingAISuggestions(false);
    setIsAISuggestionsOpen(true);
  };

  const addWebsiteToMember = (memberId: number, website: string) => {
    setFamilyMembers(members =>
      members.map(member =>
        member.id === memberId
          ? { ...member, allowedWebsites: [...member.allowedWebsites, website] }
          : member
      )
    );
    setAiSuggestions(aiSuggestions.filter(s => s !== website));
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      activeTab === "bluemode" || activeTab === "individual" || activeTab === "analytics"
        ? 'bg-gradient-to-br from-blue-50 to-indigo-100'
        : 'bg-background'
    }`}>
      {/* Header */}
      <div className={`transition-all duration-500 ${
        activeTab === "bluemode" || activeTab === "individual" || activeTab === "analytics"
          ? 'bg-gradient-to-r from-blue-600 to-indigo-700'
          : 'bg-primary'
      } text-primary-foreground`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackClick}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div>
                  <h1 className="text-2xl font-bold">myFamily</h1>
                  <p className="text-primary-foreground/80">AI-Powered Parental Controls</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {activeTab === "bluemode" && (
                <div className="text-right">
                  <p className="text-sm font-medium">{activeMembers.length} Active Blue Mode</p>
                  <p className="text-xs text-primary-foreground/80">Total: {totalActiveTime} today</p>
                </div>
              )}
              <Badge className="bg-accent text-accent-foreground font-semibold">
                Powered by Telkom
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className={`grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3 transition-all duration-300 ${
            activeTab === "bluemode" ? 'bg-blue-100' : ''
          }`}>
            <TabsTrigger value="bluemode" className="flex items-center gap-2">
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Blue Mode</span>
            </TabsTrigger>
            <TabsTrigger value="individual" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Family</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="bluemode" className="space-y-8">
            <BlueMode />
          </TabsContent>

          <TabsContent value="individual" className={`space-y-8 ${activeTab === "individual" ? 'blue-theme' : ''}`}>
            {/* Family Members Management */}
            <Card className={`telkom-card ${activeTab === "individual" ? 'border-blue-200 bg-gradient-to-br from-blue-50/60 to-indigo-50/60' : ''}`}>
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={`flex items-center gap-3 text-xl ${activeTab === "individual" ? 'text-blue-800' : ''}`}>
                      <Users className={`w-6 h-6 ${activeTab === "individual" ? 'text-blue-600' : ''}`} />
                      Family Members
                      {activeTab === "individual" && (
                        <Badge className="bg-blue-600 text-white">AI Enhanced</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className={activeTab === "individual" ? 'text-blue-600' : ''}>
                      Manage individual Blue Mode settings and AI-powered website suggestions for each family member
                    </CardDescription>
                  </div>
                  <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
                    <DialogTrigger asChild>
                      <Button
                        variant={activeTab === "individual" ? "default" : "telkom-outline"}
                        size="lg"
                        className={activeTab === "individual" ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' : ''}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <UserPlus className="w-5 h-5 text-blue-600" />
                          Add Family Member
                        </DialogTitle>
                        <DialogDescription>
                          Add a new family member to manage their individual Blue Mode access and AI-powered website suggestions
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium">Child's Name</Label>
                          <Input
                            id="name"
                            value={newMemberName}
                            onChange={(e) => setNewMemberName(e.target.value)}
                            placeholder="Enter child's name"
                            className="w-full"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="age" className="text-sm font-medium">Age</Label>
                            <Input
                              id="age"
                              type="number"
                              value={newMemberAge}
                              onChange={(e) => setNewMemberAge(e.target.value)}
                              placeholder="Age"
                              className="w-full"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="device" className="text-sm font-medium">Device</Label>
                            <Input
                              id="device"
                              value={newMemberDevice}
                              onChange={(e) => setNewMemberDevice(e.target.value)}
                              placeholder="Device name"
                              className="w-full"
                            />
                          </div>
                        </div>
                        <Button onClick={addFamilyMember} className="w-full bg-blue-600 hover:bg-blue-700">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Add Family Member
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  {familyMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`flex items-center justify-between p-6 border rounded-xl transition-all duration-300 ${
                        activeTab === "individual"
                          ? 'border-blue-200 bg-white/70 hover:bg-white/90 hover:border-blue-300 hover:shadow-lg'
                          : 'border-border'
                      }`}
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                          member.status === 'blue-mode'
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 animate-pulse'
                            : member.status === 'active'
                            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                            : 'bg-gradient-to-r from-gray-400 to-gray-500'
                        }`}>
                          {member.name.charAt(0)}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-lg font-bold">{member.name}</h3>
                            <Badge className={`px-3 py-1 ${
                              member.status === 'blue-mode'
                                ? 'bg-blue-100 text-blue-800 border-blue-200'
                                : member.status === 'active'
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : 'bg-gray-100 text-gray-800 border-gray-200'
                            }`}>
                              {member.status === 'blue-mode' ? '🔵 Blue Mode Active' :
                               member.status === 'active' ? '🟢 Active' : '⚫ Inactive'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground">
                            {member.age} years old • {member.device}
                          </p>
                          <div className="flex items-center gap-4">
                            {member.isBlueModeActive && (
                              <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                <Timer className="w-4 h-4" />
                                <span className="text-sm font-semibold font-mono">{member.todayBlueModeTime}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Globe className="w-4 h-4" />
                              <span>{member.allowedWebsites.length} allowed websites</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col gap-2">
                          <Button
                            variant={member.isBlueModeActive ? "default" : "outline"}
                            size="default"
                            onClick={() => toggleBlueMode(member.id)}
                            className={`px-4 py-2 min-w-[140px] transition-all duration-300 ${
                              member.isBlueModeActive
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md'
                                : activeTab === "individual"
                                ? 'border-blue-300 text-blue-600 hover:bg-blue-50'
                                : ''
                            }`}
                          >
                            {member.isBlueModeActive ? (
                              <>
                                <Pause className="w-4 h-4 mr-2" />
                                Pause Blue Mode
                              </>
                            ) : (
                              <>
                                <Play className="w-4 h-4 mr-2" />
                                Start Blue Mode
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="default"
                            onClick={() => getAISuggestions(member)}
                            disabled={isLoadingAISuggestions}
                            className={`px-4 py-2 min-w-[120px] transition-all duration-300 ${
                              activeTab === "individual"
                                ? 'border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400'
                                : ''
                            }`}
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            {isLoadingAISuggestions ? 'Loading...' : 'AI Suggestions'}
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="lg"
                          onClick={() => removeFamilyMember(member.id)}
                          className={`transition-all duration-300 ${
                            activeTab === "individual"
                              ? 'text-red-500 hover:text-red-700 hover:bg-red-50'
                              : 'text-destructive hover:text-destructive'
                          }`}
                        >
                          <UserMinus className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="telkom-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Blue Mode</p>
                      <p className="text-2xl font-bold text-blue-600">{activeMembers.length}</p>
                      <p className="text-xs text-blue-600">Currently active</p>
                    </div>
                    <Bot className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="telkom-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Today</p>
                      <p className="text-2xl font-bold text-green-600">{totalActiveTime}</p>
                      <p className="text-xs text-green-600">Blue Mode time</p>
                    </div>
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              <Card className="telkom-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Family Members</p>
                      <p className="text-2xl font-bold text-primary">{familyMembers.length}</p>
                      <p className="text-xs text-primary">Total managed</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
              <Card className="telkom-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Session</p>
                      <p className="text-2xl font-bold text-orange-600">2h 15m</p>
                      <p className="text-xs text-orange-600">Per child</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Individual Member Analytics */}
            <Card className="telkom-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Individual Blue Mode Analytics
                </CardTitle>
                <CardDescription>
                  Detailed breakdown of each family member's Blue Mode usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {familyMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          member.status === 'blue-mode' ? 'bg-gradient-to-r from-blue-500 to-indigo-600' :
                          'bg-gray-400'
                        }`}>
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm text-muted-foreground">{member.device}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm font-medium">{member.todayBlueModeTime}</p>
                          <p className="text-xs text-muted-foreground">Today</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{member.allowedWebsites.length}</p>
                          <p className="text-xs text-muted-foreground">Sites</p>
                        </div>
                        <Badge className={`${
                          member.status === 'blue-mode' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {member.status === 'blue-mode' ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* AI Suggestions Dialog */}
      <Dialog open={isAISuggestionsOpen} onOpenChange={setIsAISuggestionsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-600" />
              AI Website Suggestions for {selectedMemberForAI?.name}
            </DialogTitle>
            <DialogDescription>
              AI-powered website recommendations based on {selectedMemberForAI?.name}'s age and current interests
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {isLoadingAISuggestions ? (
              <div className="flex items-center justify-center py-8">
                <div className="flex items-center gap-3">
                  <Bot className="w-6 h-6 text-blue-600 animate-pulse" />
                  <span className="text-lg">AI is analyzing {selectedMemberForAI?.name}'s profile...</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-lg hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-blue-800">{suggestion}</p>
                      <p className="text-xs text-blue-600 mt-1">
                        {selectedMemberForAI?.age && selectedMemberForAI.age <= 12 ? 'Kid-friendly' :
                         selectedMemberForAI?.age && selectedMemberForAI.age <= 16 ? 'Teen educational' :
                         'Advanced learning'}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => selectedMemberForAI && addWebsiteToMember(selectedMemberForAI.id, suggestion)}
                      className="bg-blue-600 hover:bg-blue-700 text-white ml-3"
                    >
                      <Plus className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setIsAISuggestionsOpen(false)}
                className="border-blue-300 text-blue-600 hover:bg-blue-50"
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
