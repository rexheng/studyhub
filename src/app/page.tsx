"use client";

import { useState } from "react";
import Header from "@/components/mobile/Header";
import DailyGoalCard from "@/components/mobile/DailyGoalCard";
import StatsGrid from "@/components/mobile/StatsGrid";
import LearningPaths from "@/components/mobile/LearningPaths";
import BottomNav from "@/components/mobile/BottomNav";
import PracticeView from "@/components/mobile/PracticeView";
import ProfileView from "@/components/mobile/ProfileView";
import SettingsView from "@/components/mobile/SettingsView";
import { CourseCreatorPrototype } from "@/components/course-creator/CourseCreatorPrototype";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");
  const [initialCourseId, setInitialCourseId] = useState<string | null>(null);

  const handleNavigateToCourse = (courseId: string) => {
    setActiveTab("learn");
    setInitialCourseId(courseId);
  };

  const handleOpenSettings = () => {
    setActiveTab("settings");
  };

  const handleDailyGoalContinue = () => {
    setActiveTab("learn");
  };

  const handleDailyGoalReview = () => {
    setActiveTab("practice");
  };

  const handlePracticeClose = () => {
    setActiveTab("home");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-6 pb-24">
            <DailyGoalCard 
              onContinue={handleDailyGoalContinue}
              onReview={handleDailyGoalReview}
            />
            <StatsGrid />
            <LearningPaths onNavigateToCourse={handleNavigateToCourse} />
          </div>
        );
      case "learn":
        return <CourseCreatorPrototype initialCourseId={initialCourseId} />;
      case "practice":
        return <PracticeView onClose={handlePracticeClose} />;
      case "profile":
        return <ProfileView onOpenSettings={handleOpenSettings} />;
      case "settings":
        return <SettingsView onBack={() => setActiveTab("profile")} />;
      default:
        return null;
    }
  };

  const showHeader = activeTab !== "practice" && activeTab !== "learn" && activeTab !== "settings";
  const showBottomNav = activeTab !== "settings";

  return (
    <div className="min-h-screen min-h-[100dvh] bg-background text-foreground flex flex-col">
      {showHeader && (
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border px-4 pt-safe">
          <Header />
        </div>
      )}
      <main className={`flex-1 overflow-y-auto ${activeTab === "learn" ? "p-0" : "px-4 py-4"}`}>
        {renderContent()}
      </main>
      {showBottomNav && (
        <div className="sticky bottom-0 pb-safe bg-background/95 backdrop-blur-sm border-t border-border">
          <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      )}
    </div>
  );
}
