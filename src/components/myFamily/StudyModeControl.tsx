import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Clock, 
  Play, 
  Pause, 
  Target,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Timer
} from "lucide-react";

interface FamilyMember {
  id: number;
  name: string;
  role: string;
  age: number;
  device: string;
  studyMode: boolean;
  todayStudyTime: string;
  weeklyAverage: string;
  status: string;
}

interface StudyModeControlProps {
  familyMembers: FamilyMember[];
}

export function StudyModeControl({ familyMembers }: StudyModeControlProps) {
  const [members, setMembers] = useState(familyMembers);
  const [studyGoals, setStudyGoals] = useState({
    1: { daily: 4, weekly: 28 }, // Emma
    2: { daily: 3, weekly: 21 }, // Liam
    3: { daily: 5, weekly: 35 }, // Sophie
  });

  const toggleStudyMode = (memberId: number) => {
    setMembers(members.map(member => 
      member.id === memberId 
        ? { ...member, studyMode: !member.studyMode, status: !member.studyMode ? 'active' : 'break' }
        : member
    ));
  };

  const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.replace('h', '').replace('m', '').split(' ').map(Number);
    return hours + (minutes / 60);
  };

  const formatTime = (hours: number) => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  const getProgressPercentage = (current: string, goal: number) => {
    const currentHours = parseTime(current);
    return Math.min((currentHours / goal) * 100, 100);
  };

  const getCurrentWeekData = () => {
    // Mock weekly study data
    return {
      Emma: [3.5, 4.2, 3.8, 4.5, 3.9, 4.1, 3.7],
      Liam: [2.1, 2.8, 2.3, 3.1, 2.5, 2.7, 1.3],
      Sophie: [5.2, 4.8, 5.5, 5.1, 4.9, 5.3, 5.2]
    };
  };

  const weekData = getCurrentWeekData();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="telkom-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Study Mode Control
          </CardTitle>
          <CardDescription>
            Monitor and control study sessions for each family member. Study mode blocks non-educational apps and websites.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button variant="telkom" className="h-16 flex-col">
          <Play className="w-5 h-5 mb-1" />
          Start All Sessions
        </Button>
        <Button variant="telkom-outline" className="h-16 flex-col">
          <Pause className="w-5 h-5 mb-1" />
          Pause All Sessions
        </Button>
        <Button variant="telkom-ghost" className="h-16 flex-col">
          <Target className="w-5 h-5 mb-1" />
          Set Goals
        </Button>
        <Button variant="telkom-ghost" className="h-16 flex-col">
          <Calendar className="w-5 h-5 mb-1" />
          Schedule Study
        </Button>
      </div>

      {/* Individual Member Controls */}
      <div className="grid gap-6">
        {members.map((member) => {
          const goal = studyGoals[member.id as keyof typeof studyGoals];
          const progress = getProgressPercentage(member.todayStudyTime, goal.daily);
          const isOnTrack = progress >= 80;

          return (
            <Card key={member.id} className="telkom-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-primary">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{member.name}</h3>
                      <p className="text-muted-foreground">
                        {member.age} years old • {member.device}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Study Mode</p>
                      <Switch 
                        checked={member.studyMode}
                        onCheckedChange={() => toggleStudyMode(member.id)}
                        className="mt-1"
                      />
                    </div>
                    {member.studyMode ? (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="secondary">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Free Time
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Today's Progress */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Today's Progress</h4>
                      <span className="text-sm text-muted-foreground">
                        {member.todayStudyTime} / {formatTime(goal.daily)}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <div className="flex items-center gap-1">
                      {isOnTrack ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-orange-600" />
                      )}
                      <span className="text-sm text-muted-foreground">
                        {isOnTrack ? 'On track' : 'Needs attention'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Weekly Average</h4>
                    <p className="text-2xl font-bold">{member.weeklyAverage}</p>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+8% from last week</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Current Session</h4>
                    {member.studyMode ? (
                      <div className="flex items-center gap-2">
                        <Timer className="w-4 h-4 text-primary" />
                        <span className="text-lg font-semibold">1h 23m</span>
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Not in study mode</p>
                    )}
                    <Button 
                      variant={member.studyMode ? "telkom-outline" : "telkom"} 
                      size="sm"
                      onClick={() => toggleStudyMode(member.id)}
                    >
                      {member.studyMode ? (
                        <>
                          <Pause className="w-4 h-4 mr-1" />
                          End Session
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-1" />
                          Start Session
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Weekly Chart */}
                <div className="space-y-3">
                  <h4 className="font-medium">This Week's Study Time</h4>
                  <div className="flex items-end gap-2 h-24">
                    {weekData[member.name as keyof typeof weekData]?.map((hours, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-1">
                        <div 
                          className="w-full bg-primary rounded-t-sm transition-all duration-300 hover:bg-primary-hover"
                          style={{ 
                            height: `${(hours / goal.daily) * 100}%`,
                            minHeight: '8px'
                          }}
                        ></div>
                        <span className="text-xs text-muted-foreground">{weekDays[index]}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0h</span>
                    <span>{formatTime(goal.daily)} (goal)</span>
                  </div>
                </div>

                {/* Session Controls */}
                {member.studyMode && (
                  <div className="flex gap-2 pt-4 border-t border-border">
                    <Button variant="telkom-outline" size="sm">
                      <Clock className="w-4 h-4 mr-1" />
                      Add Break (15min)
                    </Button>
                    <Button variant="telkom-outline" size="sm">
                      <Target className="w-4 h-4 mr-1" />
                      Extend Session
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Emergency Stop
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Study Goals Summary */}
      <Card className="telkom-card">
        <CardHeader>
          <CardTitle>Study Goals & Achievements</CardTitle>
          <CardDescription>Track progress towards daily and weekly study goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            {members.map((member) => {
              const goal = studyGoals[member.id as keyof typeof studyGoals];
              const dailyProgress = getProgressPercentage(member.todayStudyTime, goal.daily);
              const weeklyProgress = getProgressPercentage(member.weeklyAverage, goal.weekly / 7);
              
              return (
                <div key={member.id} className="space-y-3 p-4 border border-border rounded-lg">
                  <h4 className="font-semibold">{member.name}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Daily Goal</span>
                      <span>{Math.round(dailyProgress)}%</span>
                    </div>
                    <Progress value={dailyProgress} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Weekly Average</span>
                      <span>{Math.round(weeklyProgress)}%</span>
                    </div>
                    <Progress value={weeklyProgress} className="h-2" />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}