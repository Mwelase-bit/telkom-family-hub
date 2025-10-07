import { useState } from "react";
import { TelkomHeader } from "@/components/TelkomHeader";
import { TelkomDashboard } from "@/components/TelkomDashboard";
import { MyFamilyDashboard } from "@/components/myFamily/MyFamilyDashboard";

const Index = () => {
  const [showMyFamily, setShowMyFamily] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleMyFamilyClick = () => {
    setIsTransitioning(true);
    // Add transition delay to show the loading effect
    setTimeout(() => {
      setShowMyFamily(true);
      setIsTransitioning(false);
    }, 1500);
  };

  const handleBackClick = () => {
    setShowMyFamily(false);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {!showMyFamily ? (
        <>
          <TelkomHeader onMyFamilyClick={handleMyFamilyClick} />
          <TelkomDashboard />
        </>
      ) : (
        <MyFamilyDashboard onBackClick={handleBackClick} />
      )}

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurry Blue Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 to-indigo-700/70 backdrop-blur-md" />

          {/* Sharp Green Text */}
          <div className="relative z-10 text-center">
            <h1 className="text-6xl font-bold text-green-400 animate-pulse">
              Powered by Telkom
            </h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
