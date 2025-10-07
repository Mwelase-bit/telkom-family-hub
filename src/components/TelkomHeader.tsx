import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  HelpCircle,
  Wifi,
  Users,
  ChevronDown,
  Sparkles,
  Bot,
  Target
} from "lucide-react";
import { useState } from "react";

interface TelkomHeaderProps {
  onMyFamilyClick: () => void;
}

export function TelkomHeader({ onMyFamilyClick }: TelkomHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlueModeActive, setIsBlueModeActive] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top utility bar */}
        <div className="flex items-center justify-end py-2 text-sm border-b border-border/50">
          <div className="flex items-center gap-4">
            <Button variant="telkom-ghost" size="sm">
              <HelpCircle className="w-4 h-4" />
              Help
            </Button>
            <Button variant="telkom-ghost" size="sm">
              <Wifi className="w-4 h-4" />
              Coverage
            </Button>
            <Button variant="telkom-ghost" size="sm">
              <Search className="w-4 h-4" />
              Search
            </Button>
            <Button variant="telkom-ghost" size="sm">
              <ShoppingCart className="w-4 h-4" />
              Cart
            </Button>
            <Button variant="telkom-ghost" size="sm">
              <User className="w-4 h-4" />
              Login
              <ChevronDown className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4 flex-1">
            {/* Telkom Logo */}
            <div className="text-2xl font-bold text-primary flex-shrink-0">
              Telkom
            </div>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-3 flex-1 justify-center">
              <Button variant="telkom-ghost" className="font-medium text-sm px-3">
                Personal
                <ChevronDown className="w-3 h-3" />
              </Button>
              <Button variant="telkom-ghost" className="font-medium text-sm px-3">
                Business
                <ChevronDown className="w-3 h-3" />
              </Button>
              <Button variant="telkom-ghost" className="font-medium text-sm px-3">
                Enterprise
                <ChevronDown className="w-3 h-3" />
              </Button>
              <Button variant="telkom-ghost" className="font-medium text-sm px-3">
                Marketplace
              </Button>
              <Button variant="telkom-ghost" className="font-medium text-sm px-3">
                Deals
                <ChevronDown className="w-3 h-3" />
              </Button>
            </nav>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* myFamily Dropdown Menu - Desktop */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="telkom-cta"
                  size="lg"
                  className="hidden md:flex"
                >
                  <Users className="w-5 h-5" />
                  myFamily
                  <Badge className="ml-2 bg-background text-accent-foreground">New</Badge>
                  <ChevronDown className="w-3 h-3 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={onMyFamilyClick} className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-blue-600" />
                  <span>Blue Mode</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => window.open('https://68d8bebe34a013035ea260c7--resonant-squirrel-a64975.netlify.app/', '_blank')}
                  className="flex items-center gap-2"
                >
                  <Target className="w-4 h-4 text-orange-600" />
                  <span>Focus App</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Mobile myFamily Dropdown */}
        <div className="md:hidden pb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="telkom-cta"
                size="lg"
                className="w-full"
              >
                <Users className="w-5 h-5 mr-2" />
                myFamily - Parental Controls
                <Badge className="ml-2 bg-background text-accent-foreground">New</Badge>
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={onMyFamilyClick} className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-blue-600" />
                <span>Blue Mode</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => window.open('https://68d8bebe34a013035ea260c7--resonant-squirrel-a64975.netlify.app/', '_blank')}
                className="flex items-center gap-2"
              >
                <Target className="w-4 h-4 text-orange-600" />
                <span>Focus App</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
