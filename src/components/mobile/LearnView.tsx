import { Search, ChevronRight, Book, PlayCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const modules = [
  {
    title: "Investment Banking",
    description: "Master the fundamentals of IB",
    progress: 45,
    color: "bg-blue-500",
    lessons: [
      { title: "Industry Overview", duration: "10 min", completed: true },
      { title: "Financial Statements", duration: "25 min", completed: true },
      { title: "Enterprise Value", duration: "15 min", completed: false },
    ]
  },
  {
    title: "Accounting",
    description: "Core accounting principles",
    progress: 10,
    color: "bg-emerald-500",
    lessons: [
      { title: "The 3 Statements", duration: "20 min", completed: true },
      { title: "Income Statement", duration: "30 min", completed: false },
    ]
  },
  {
    title: "Valuation",
    description: "DCF, Comps, and Precedent Transactions",
    progress: 0,
    color: "bg-purple-500",
    lessons: [
      { title: "Intro to Valuation", duration: "15 min", completed: false },
    ]
  }
];

export default function LearnView() {
  return (
    <div className="space-y-6 pb-24">
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 pb-4 pt-2">
        <h2 className="text-2xl font-bold mb-4">Catalog</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search topics..." className="pl-9 bg-secondary/50 border-none" />
        </div>
      </div>

      <div className="space-y-6">
        {modules.map((module, i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${module.color} flex items-center justify-center text-white`}>
                  <Book className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{module.title}</h3>
                  <p className="text-xs text-muted-foreground">{module.description}</p>
                </div>
              </div>
              <span className="text-xs font-medium text-muted-foreground">{module.progress}%</span>
            </div>

            <div className="space-y-2 pl-4 border-l-2 border-border ml-5">
              {module.lessons.map((lesson, j) => (
                <div key={j} className="flex items-center justify-between p-3 rounded-lg bg-card border border-border/50 hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${lesson.completed ? "bg-green-500/20 text-green-600" : "bg-secondary text-muted-foreground"}`}>
                      {lesson.completed ? (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-[10px] font-bold">{j + 1}</span>
                      )}
                    </div>
                    <span className={`text-sm ${lesson.completed ? "text-muted-foreground line-through" : "font-medium"}`}>
                      {lesson.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                    <PlayCircle className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
