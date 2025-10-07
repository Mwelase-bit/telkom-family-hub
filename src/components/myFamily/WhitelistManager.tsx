import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Plus,
  Trash2,
  Globe,
  CheckCircle,
  XCircle,
  Search,
  Shield,
  Bot,
  Filter,
  Sparkles
} from "lucide-react";

interface BlueModeProps {
  selectedMember?: any;
}

export function BlueMode({ selectedMember }: BlueModeProps) {
  const [newWebsite, setNewWebsite] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isBlueModeActive, setIsBlueModeActive] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isBlueThemeActive, setIsBlueThemeActive] = useState(false);

  // Mock data for allowed websites
  const [allowedWebsites, setAllowedWebsites] = useState([
    { id: 1, url: "khan-academy.org", category: "Education", enabled: true, addedBy: "Parent", date: "2024-01-15" },
    { id: 2, url: "duolingo.com", category: "Language Learning", enabled: true, addedBy: "Emma", date: "2024-01-20" },
    { id: 3, url: "youtube.com/education", category: "Education", enabled: true, addedBy: "Parent", date: "2024-01-10" },
    { id: 4, url: "wikipedia.org", category: "Reference", enabled: true, addedBy: "Parent", date: "2024-01-05" },
    { id: 5, url: "scratch.mit.edu", category: "Programming", enabled: false, addedBy: "Liam", date: "2024-01-25" },
  ]);

  const addWebsite = () => {
    if (newWebsite.trim()) {
      const newSite = {
        id: Date.now(),
        url: newWebsite.trim(),
        category: "Uncategorized",
        enabled: true,
        addedBy: "Parent",
        date: new Date().toISOString().split('T')[0]
      };
      setAllowedWebsites([...allowedWebsites, newSite]);
      setNewWebsite("");
    }
  };

  const removeWebsite = (id: number) => {
    setAllowedWebsites(allowedWebsites.filter(site => site.id !== id));
  };

  const toggleWebsite = (id: number) => {
    setAllowedWebsites(allowedWebsites.map(site =>
      site.id === id ? { ...site, enabled: !site.enabled } : site
    ));
  };

  const filteredWebsites = allowedWebsites.filter(site =>
    site.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // AI-powered website suggestions
  const getAISuggestions = async (query: string) => {
    setIsLoadingSuggestions(true);

    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const suggestions: string[] = [];

    if (query.toLowerCase().includes('education') || query.toLowerCase().includes('learning')) {
      suggestions.push('khan-academy.org', 'coursera.org', 'edx.org', 'code.org', 'pbskids.org');
    } else if (query.toLowerCase().includes('game') || query.toLowerCase().includes('fun')) {
      suggestions.push('coolmathgames.com', 'abcya.com', 'pbskids.org/games', 'nationalgeographic.com/kids');
    } else if (query.toLowerCase().includes('art') || query.toLowerCase().includes('creative')) {
      suggestions.push('drawabox.com', 'ctrlpaint.com', 'proko.com', 'quickposes.com');
    } else if (query.toLowerCase().includes('science') || query.toLowerCase().includes('stem')) {
      suggestions.push('phet.colorado.edu', 'nasa.gov/kids', 'sciencekids.co.nz', 'dkfindout.com');
    } else {
      // Default educational suggestions
      suggestions.push('khan-academy.org', 'duolingo.com', 'scratch.mit.edu', 'wikipedia.org', 'nationalgeographic.com/kids');
    }

    setAiSuggestions(suggestions);
    setIsLoadingSuggestions(false);
  };

  const addAISuggestion = (suggestion: string) => {
    const newSite = {
      id: Date.now(),
      url: suggestion,
      category: "AI Suggested",
      enabled: true,
      addedBy: "AI Bot",
      date: new Date().toISOString().split('T')[0]
    };
    setAllowedWebsites([...allowedWebsites, newSite]);
    setAiSuggestions(aiSuggestions.filter(s => s !== suggestion));
  };

  // Blue Mode toggle functionality
  const toggleBlueMode = () => {
    const newBlueModeState = !isBlueThemeActive;
    setIsBlueThemeActive(newBlueModeState);

    // When Blue Mode is activated, enable all AI-suggested websites
    if (newBlueModeState) {
      setAllowedWebsites(allowedWebsites.map(site =>
        site.category === "AI Suggested" ? { ...site, enabled: true } : site
      ));
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Education": return "bg-blue-100 text-blue-800";
      case "Language Learning": return "bg-green-100 text-green-800";
      case "Reference": return "bg-purple-100 text-purple-800";
      case "Programming": return "bg-yellow-100 text-yellow-800";
      case "Music": return "bg-pink-100 text-pink-800";
      case "Productivity": return "bg-orange-100 text-orange-800";
      case "Utility": return "bg-gray-100 text-gray-800";
      case "AI Suggested": return "bg-primary/10 text-primary";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className={`space-y-8 transition-all duration-300 ${isBlueThemeActive ? 'blue-theme' : ''}`}>
      {/* Header */}
      <Card className={`telkom-card ${isBlueThemeActive ? 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50' : ''}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className={`w-5 h-5 ${isBlueThemeActive ? 'text-blue-600' : ''}`} />
                Blue Mode
                {isBlueThemeActive && (
                  <Badge className="bg-blue-600 text-white ml-2">AI Active</Badge>
                )}
              </CardTitle>
              <CardDescription className={isBlueThemeActive ? 'text-blue-700' : ''}>
                AI-powered content filtering and website management for safe browsing.
              </CardDescription>
            </div>

            {/* Blue Mode Toggle Button */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={`text-sm font-medium ${isBlueThemeActive ? 'text-blue-700' : 'text-muted-foreground'}`}>
                  {isBlueThemeActive ? 'AI Blue Mode Active' : 'AI Blue Mode Inactive'}
                </p>
                <p className="text-xs text-muted-foreground">
                  {allowedWebsites.filter(w => w.category === "AI Suggested" && w.enabled).length} AI sites active
                </p>
              </div>
              <Button
                onClick={toggleBlueMode}
                variant={isBlueThemeActive ? "default" : "outline"}
                className={`relative overflow-hidden transition-all duration-300 ${
                  isBlueThemeActive
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25'
                    : 'border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Bot className={`w-4 h-4 ${isBlueThemeActive ? 'text-white' : 'text-blue-600'}`} />
                  <span className="font-semibold">
                    {isBlueThemeActive ? 'ON' : 'OFF'}
                  </span>
                </div>
                {isBlueThemeActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* AI Search and Filter */}
      <Card className={`telkom-card ${isBlueThemeActive ? 'border-blue-200 bg-gradient-to-r from-blue-50/50 to-indigo-50/50' : ''}`}>
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Bot className={`absolute left-3 top-3 w-4 h-4 ${isBlueThemeActive ? 'text-blue-600' : 'text-primary'}`} />
              <Input
                placeholder="Ask AI to suggest safe websites (e.g., 'educational sites for kids')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchTerm.trim() && getAISuggestions(searchTerm)}
                className={`pl-10 transition-all duration-300 ${
                  isBlueThemeActive
                    ? 'border-blue-300 focus:border-blue-500 focus:ring-blue-500/20 bg-white/80'
                    : ''
                }`}
              />
            </div>
            <Button
              variant={isBlueThemeActive ? "default" : "outline"}
              className={`flex items-center gap-2 transition-all duration-300 ${
                isBlueThemeActive
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md'
                  : ''
              }`}
              onClick={() => searchTerm.trim() && getAISuggestions(searchTerm)}
              disabled={isLoadingSuggestions || !searchTerm.trim()}
            >
              <Bot className="w-4 h-4" />
              {isLoadingSuggestions ? 'Thinking...' : 'Ask AI'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      {aiSuggestions.length > 0 && (
        <Card className={`telkom-card ${isBlueThemeActive ? 'border-blue-200 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 shadow-blue-100/50' : ''}`}>
          <CardHeader className={isBlueThemeActive ? 'pb-4' : ''}>
            <CardTitle className={`flex items-center gap-2 ${isBlueThemeActive ? 'text-blue-800' : ''}`}>
              <Bot className={`w-5 h-5 ${isBlueThemeActive ? 'text-blue-600' : 'text-primary'}`} />
              AI Suggestions
              {isBlueThemeActive && (
                <Badge className="bg-blue-600 text-white text-xs">Enhanced</Badge>
              )}
            </CardTitle>
            <CardDescription className={isBlueThemeActive ? 'text-blue-600' : ''}>
              Safe websites recommended by AI based on your search
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 border rounded-lg transition-all duration-300 ${
                    isBlueThemeActive
                      ? 'border-blue-200 bg-white/70 hover:bg-white/90 hover:border-blue-300 hover:shadow-md'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{suggestion}</p>
                    <p className="text-xs text-muted-foreground">AI Suggested</p>
                  </div>
                  <Button
                    size="sm"
                    variant={isBlueThemeActive ? "default" : "outline"}
                    onClick={() => addAISuggestion(suggestion)}
                    className={`ml-2 transition-all duration-300 ${
                      isBlueThemeActive
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                        : ''
                    }`}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Websites */}
      <Card className={`telkom-card ${isBlueThemeActive ? 'border-blue-200 bg-gradient-to-br from-blue-50/60 to-indigo-50/60' : ''}`}>
        <CardHeader className={isBlueThemeActive ? 'pb-4' : ''}>
          <CardTitle className={`flex items-center gap-2 ${isBlueThemeActive ? 'text-blue-800' : ''}`}>
            <Globe className={`w-5 h-5 ${isBlueThemeActive ? 'text-blue-600' : ''}`} />
            Allowed Websites
            {isBlueThemeActive && (
              <Badge className="bg-blue-600 text-white text-xs">Protected</Badge>
            )}
          </CardTitle>
          <CardDescription className={isBlueThemeActive ? 'text-blue-600' : ''}>
            Add websites that children can access
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Add new website */}
          <div className="flex gap-2">
            <Input
              placeholder="Enter website URL (e.g., youtube.com)"
              value={newWebsite}
              onChange={(e) => setNewWebsite(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addWebsite()}
              className={isBlueThemeActive ? 'border-blue-300 focus:border-blue-500 bg-white/80' : ''}
            />
            <Button
              onClick={addWebsite}
              variant={isBlueThemeActive ? "default" : "telkom"}
              className={isBlueThemeActive ? 'bg-blue-600 hover:bg-blue-700 text-white' : ''}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Website list */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredWebsites.map((website) => (
              <div
                key={website.id}
                className={`flex items-center justify-between p-3 border rounded-lg transition-all duration-300 ${
                  isBlueThemeActive
                    ? 'border-blue-200 bg-white/70 hover:bg-white/90 hover:border-blue-300 hover:shadow-sm'
                    : 'border-border'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{website.url}</p>
                    <Badge className={getCategoryColor(website.category)}>
                      {website.category}
                    </Badge>
                    {website.category === "AI Suggested" && isBlueThemeActive && (
                      <Sparkles className="w-3 h-3 text-blue-600" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Added by {website.addedBy} on {website.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {website.enabled ? (
                      <CheckCircle className={`w-4 h-4 ${isBlueThemeActive ? 'text-green-500' : 'text-green-600'}`} />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-600" />
                    )}
                    <Switch
                      checked={website.enabled}
                      onCheckedChange={() => toggleWebsite(website.id)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeWebsite(website.id)}
                    className={`transition-all duration-300 ${
                      isBlueThemeActive ? 'text-red-500 hover:text-red-700 hover:bg-red-50' : 'text-destructive hover:text-destructive'
                    }`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className={`telkom-card ${isBlueThemeActive ? 'border-blue-200 bg-gradient-to-br from-blue-50/70 to-indigo-50/70' : ''}`}>
          <CardContent className="p-4 text-center">
            <p className={`text-2xl font-bold ${isBlueThemeActive ? 'text-blue-700' : 'text-primary'}`}>
              {allowedWebsites.length}
            </p>
            <p className={`text-sm ${isBlueThemeActive ? 'text-blue-600' : 'text-muted-foreground'}`}>
              Total Websites
            </p>
          </CardContent>
        </Card>
        <Card className={`telkom-card ${isBlueThemeActive ? 'border-green-200 bg-gradient-to-br from-green-50/70 to-emerald-50/70' : ''}`}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {allowedWebsites.filter(w => w.enabled).length}
            </p>
            <p className={`text-sm ${isBlueThemeActive ? 'text-green-600' : 'text-muted-foreground'}`}>
              Active
            </p>
          </CardContent>
        </Card>
        <Card className={`telkom-card ${isBlueThemeActive ? 'border-orange-200 bg-gradient-to-br from-orange-50/70 to-amber-50/70' : ''}`}>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-orange-600">
              {allowedWebsites.filter(w => !w.enabled).length}
            </p>
            <p className={`text-sm ${isBlueThemeActive ? 'text-orange-600' : 'text-muted-foreground'}`}>
              Disabled
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
