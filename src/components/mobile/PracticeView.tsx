import { useState } from "react";
import { X, Clock, Heart, Flag, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface PracticeViewProps {
  onClose?: () => void;
}

export default function PracticeView({ onClose }: PracticeViewProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const question = {
    id: 1,
    text: "Which of the following is NOT a standard method of valuation in investment banking?",
    difficulty: "medium",
    company: "Goldman Sachs",
    options: [
      { id: 0, text: "Discounted Cash Flow (DCF)" },
      { id: 1, text: "Precedent Transactions" },
      { id: 2, text: "Comparable Company Analysis" },
      { id: 3, text: "Random Walk Theory" },
    ],
    correctId: 3,
    explanation: "Random Walk Theory is a financial theory stating that stock market prices evolve according to a random walk and thus cannot be predicted. It is not a valuation methodology used to value companies in IB."
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    setIsCorrect(selectedOption === question.correctId);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setIsCorrect(false);
    // Logic to load next question would go here
  };

  return (
    <div className="flex flex-col h-full pb-20">
      {/* Top Bar */}
      <div className="flex items-center justify-between py-2 mb-4">
        <X className="w-6 h-6 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={onClose} />
        <div className="flex-1 mx-4">
          <Progress value={30} className="h-2" />
        </div>
        <div className="flex items-center gap-1 text-rose-500 font-bold">
          <Heart className="w-5 h-5 fill-current" />
          <span>3</span>
        </div>
      </div>

      {/* Question Area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="flex items-center gap-2 mb-4">
          <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 text-[10px] font-bold uppercase tracking-wider">
            {question.difficulty}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
            {question.company}
          </span>
        </div>

        <h2 className="text-lg font-semibold leading-relaxed mb-8">
          {question.text}
        </h2>

        {/* Options */}
        <div className="space-y-3">
          {question.options.map((option) => {
            let stateStyle = "border-border bg-card hover:bg-secondary/50";
            if (isSubmitted) {
              if (option.id === question.correctId) {
                stateStyle = "border-green-500 bg-green-500/10 text-green-700";
              } else if (option.id === selectedOption) {
                stateStyle = "border-red-500 bg-red-500/10 text-red-700";
              } else {
                stateStyle = "opacity-50";
              }
            } else if (selectedOption === option.id) {
              stateStyle = "border-primary bg-primary/5 ring-1 ring-primary";
            }

            return (
              <button
                key={option.id}
                disabled={isSubmitted}
                onClick={() => setSelectedOption(option.id)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${stateStyle}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{option.text}</span>
                  {isSubmitted && option.id === question.correctId && (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  )}
                  {isSubmitted && option.id === selectedOption && option.id !== question.correctId && (
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="mt-6 pt-4 border-t border-border">
        {!isSubmitted ? (
          <div className="flex gap-3">
            <Button variant="ghost" className="flex-1 text-muted-foreground">Skip</Button>
            <Button 
              className="flex-[2]" 
              disabled={selectedOption === null}
              onClick={handleCheck}
            >
              Check Answer
            </Button>
          </div>
        ) : (
          <div className={`space-y-4 animate-in slide-in-from-bottom-4 fade-in duration-300`}>
            <div className={`p-4 rounded-xl ${isCorrect ? "bg-green-500/10" : "bg-red-500/10"}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <span className="font-bold text-green-700">Correct! +10 XP</span>
                ) : (
                  <span className="font-bold text-red-700">Incorrect</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {question.explanation}
              </p>
            </div>
            <Button className="w-full" onClick={handleNext}>
              Continue <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
