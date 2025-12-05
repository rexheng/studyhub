import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings, Share2, Award, Zap, Clock, BookOpen } from "lucide-react";

interface ProfileViewProps {
  onOpenSettings?: () => void;
}

export default function ProfileView({ onOpenSettings }: ProfileViewProps) {
  return (
    <div className="space-y-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-center pt-2">
        <h2 className="text-xl font-bold">Profile</h2>
        <Settings 
          className="w-6 h-6 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" 
          onClick={onOpenSettings}
        />
      </div>

      {/* Profile Card */}
      <div className="flex flex-col items-center p-6 rounded-3xl bg-card border border-border shadow-sm">
        <div className="relative mb-4">
          <Avatar className="w-24 h-24 border-4 border-background shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>RX</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full border-2 border-background">
            Lvl 5
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-1">Rex Heng</h3>
        <p className="text-sm text-muted-foreground mb-4">LSE • Class of 2025</p>
        
        <div className="flex gap-2 mb-6">
          <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">
            🏆 Gold League
          </Badge>
          <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">
            🚀 IB Track
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-8 w-full border-t border-border pt-6">
          <div className="flex flex-col items-center gap-1">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-bold">2,340</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Total XP</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center text-red-500">
              <span className="text-lg font-bold">15</span>
              <span className="text-xs ml-0.5">🔥</span>
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Streak</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Award className="w-5 h-5 text-purple-500" />
            <span className="text-lg font-bold">12</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Badges</span>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider ml-1">Statistics</h4>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
            <Clock className="w-5 h-5 text-blue-500 mb-2" />
            <div className="text-2xl font-bold">127h</div>
            <div className="text-xs text-muted-foreground">Time Studied</div>
          </div>
          <div className="p-4 rounded-2xl bg-secondary/30 border border-border/50">
            <BookOpen className="w-5 h-5 text-green-500 mb-2" />
            <div className="text-2xl font-bold">1,847</div>
            <div className="text-xs text-muted-foreground">Questions</div>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider ml-1">Recent Badges</h4>
            <span className="text-xs text-primary cursor-pointer">View All</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2 min-w-[80px]">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400 flex items-center justify-center shadow-sm">
                        <span className="text-2xl">🏆</span>
                    </div>
                    <span className="text-xs font-medium text-center leading-tight">Perfect Week</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
