import { Lock } from "lucide-react";

interface LearningPathsProps {
  onNavigateToCourse?: (courseId: string) => void;
}

const paths = [
  { title: "Investment Banking", progress: 45, locked: false, color: "bg-blue-500", slug: "ib-technical-interview" },
  { title: "Management Consulting", progress: 0, locked: true, color: "bg-emerald-500" },
  { title: "Private Equity", progress: 0, locked: true, color: "bg-purple-500" },
];

export default function LearningPaths({ onNavigateToCourse }: LearningPathsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Learning Paths</h3>
        <button className="text-sm text-primary font-medium">View All</button>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {paths.map((path, index) => (
          <div
            key={index}
            onClick={() => path.slug && onNavigateToCourse?.(path.slug)}
            className={`relative flex-shrink-0 w-64 rounded-2xl border border-border bg-card p-4 shadow-sm ${!path.locked ? 'cursor-pointer hover:shadow-md transition-all' : ''}`}
          >
            <div className={`w-10 h-10 rounded-xl ${path.color} mb-4 flex items-center justify-center text-white`}>
              {/* Icon placeholder */}
              <div className="w-5 h-5 bg-white/20 rounded-full" />
            </div>
            
            <h4 className="font-semibold mb-1">{path.title}</h4>
            
            {path.locked ? (
              <div className="flex items-center gap-2 text-muted-foreground text-sm mt-4">
                <Lock className="w-4 h-4" />
                <span>Premium</span>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span>
                  <span>{path.progress}%</span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all" 
                    style={{ width: `${path.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
