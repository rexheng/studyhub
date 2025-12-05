"use client";

import { useState } from "react";
import MobileFrame from "@/components/mobile/MobileFrame";
import Header from "@/components/mobile/Header";
import DailyGoalCard from "@/components/mobile/DailyGoalCard";
import StatsGrid from "@/components/mobile/StatsGrid";
import LearningPaths from "@/components/mobile/LearningPaths";
import BottomNav from "@/components/mobile/BottomNav";
import LearnView from "@/components/mobile/LearnView";
import PracticeView from "@/components/mobile/PracticeView";
import ProfileView from "@/components/mobile/ProfileView";
import SettingsView from "@/components/mobile/SettingsView";
import { CourseCreatorPrototype } from "@/components/course-creator/CourseCreatorPrototype";

export default function MobilePreviewPage() {
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
          <div className="space-y-8 pb-24">
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <MobileFrame>
        <div className="flex flex-col h-full bg-background text-foreground relative">
            {showHeader && <Header />}
            <main className={`flex-1 overflow-y-auto scrollbar-hide ${activeTab === "learn" ? "p-0" : "p-6"}`}>
                {renderContent()}
            </main>
            {showBottomNav && <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />}
        </div>
      </MobileFrame>
    </div>
  );
}
