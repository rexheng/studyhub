import { Trophy, Zap, Target, TrendingUp } from "lucide-react";

const stats = [
  { label: "Weekly XP", value: "450", icon: Zap, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { label: "Rank", value: "#12", icon: Trophy, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Streak", value: "15", icon: Target, color: "text-red-500", bg: "bg-red-500/10" },
  { label: "Skills", value: "65%", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 rounded-2xl border border-border bg-card p-4 shadow-sm transition-transform active:scale-95"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
            <stat.icon className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
