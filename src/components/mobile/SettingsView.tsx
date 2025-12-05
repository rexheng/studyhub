"use client";

import { useState } from "react";
import { ArrowLeft, User, Bell, Palette, Shield, HelpCircle, LogOut, ChevronRight, Moon, Sun } from "lucide-react";

interface SettingsViewProps {
  onBack: () => void;
}

// Custom Toggle component since Switch might not be available
function Toggle({ checked, onChange }: { checked: boolean; onChange: (val: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-muted'}`}
    >
      <span 
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
}

export default function SettingsView({ onBack }: SettingsViewProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(false);

  return (
    <div className="flex flex-col h-full pb-20">
      {/* Header */}
      <div className="flex items-center gap-4 py-4 border-b border-border mb-4">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Settings</h1>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto space-y-6 scrollbar-hide">
        {/* Account Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Account</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-sm">Edit Profile</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-sm">Privacy & Security</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Preferences</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  {darkMode ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
                </div>
                <span className="font-medium text-sm">Dark Mode</span>
              </div>
              <Toggle checked={darkMode} onChange={setDarkMode} />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-sm">Push Notifications</span>
              </div>
              <Toggle checked={notifications} onChange={setNotifications} />
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Notifications</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-sm">Study Reminders</span>
              </div>
              <Toggle checked={studyReminders} onChange={setStudyReminders} />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-sm">Weekly Progress Report</span>
              </div>
              <Toggle checked={weeklyReport} onChange={setWeeklyReport} />
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Support</h3>
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-sm">Help & FAQ</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 text-primary" />
                </div>
                <span className="font-medium text-sm">Contact Support</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button className="w-full p-4 bg-red-500/10 text-red-600 rounded-2xl font-medium flex items-center justify-center gap-2 hover:bg-red-500/20 transition-colors">
          <LogOut className="w-4 h-4" />
          Log Out
        </button>

        {/* App Version */}
        <div className="text-center text-xs text-muted-foreground pb-4">
          Rex Finance v1.0.0
        </div>
      </div>
    </div>
  );
}
