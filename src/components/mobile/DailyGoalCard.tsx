import { Button } from "@/components/ui/button";
import { CheckCircle2, PlayCircle } from "lucide-react";

interface DailyGoalCardProps {
  onContinue?: () => void;
  onReview?: () => void;
}

export default function DailyGoalCard({ onContinue, onReview }: DailyGoalCardProps) {
  const progress = 65; // Example progress

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 to-primary p-6 text-primary-foreground shadow-lg">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Daily Goal</h3>
          <p className="text-sm text-primary-foreground/80">Keep up the momentum!</p>
        </div>
        <div className="relative h-16 w-16">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-primary-foreground/20"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="text-white drop-shadow-md transition-all duration-1000 ease-out"
              strokeDasharray={`${progress}, 100`}
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
            {progress}%
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Button 
          variant="secondary" 
          className="flex-1 gap-2 font-semibold text-primary hover:bg-white"
          onClick={onContinue}
        >
          <PlayCircle className="w-4 h-4" />
          Continue
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 gap-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
          onClick={onReview}
        >
          <CheckCircle2 className="w-4 h-4" />
          Review
        </Button>
      </div>
    </div>
  );
}
