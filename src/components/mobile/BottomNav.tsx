import { Home, BookOpen, Target, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", id: "home" },
  { icon: BookOpen, label: "Learn", id: "learn" },
  { icon: Target, label: "Practice", id: "practice" },
  { icon: User, label: "Profile", id: "profile" },
];

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/80 backdrop-blur-lg px-6 pb-8 pt-4 z-20">
      <div className="flex justify-between items-center">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === item.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className={`w-6 h-6 ${activeTab === item.id ? "fill-current" : ""}`} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
