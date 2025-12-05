import React, { useState, useEffect } from "react";
import { ArrowLeft, Star, Users, BookOpen, Clock, Share2, Bookmark, Play, CheckCircle, MessageSquare, RotateCcw, ThumbsUp, ThumbsDown, ChevronRight } from "lucide-react";
import { clsx } from "clsx";
import { ProgressBar } from "./shared/ProgressBar";

interface CourseViewProps {
  courseId: string | null;
  courses: any[];
  onNavigateToSearch: () => void;
}

type Tab = "overview" | "study" | "collaborate";

export function CourseView({ courseId, courses, onNavigateToSearch }: CourseViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const course = courses.find(c => c.track.slug === courseId);
  
  // Flatten all questions from all lessons
  const allQuestions = course?.track.modules.flatMap((m: any) => m.lessons.flatMap((l: any) => l.questions || [])) || [];
  const currentQuestion = allQuestions[currentQuestionIndex];

  const handleNextQuestion = () => {
    setIsFlipped(false);
    setShowAnswer(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % allQuestions.length);
  };

  if (!course && courseId !== "ec201") {
      return (
          <div className="p-4 text-center">
              <p>Course not found</p>
              <button onClick={onNavigateToSearch} className="text-primary mt-2">Back to Search</button>
          </div>
      )
  }

  // Fallback for the hardcoded EC201 course
  const displayTitle = course ? course.track.title : "EC201: Microeconomics";
  const displayInstitution = course ? "Rex Finance" : "London School of Economics • Undergraduate Year 2";
  const displayDesc = course ? course.track.description : "Comprehensive microeconomics covering consumer theory, firm behavior, and market structures.";
  const displayFlashcards = course ? allQuestions.length : 347;
  const displayQuestions = course ? allQuestions.length : 156;

  return (
    <div className="max-w-md mx-auto bg-background flex flex-col h-full relative">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="p-4">
            <button onClick={onNavigateToSearch} className="mb-4 p-1 hover:bg-muted rounded-full inline-block">
                <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h1 className="text-xl font-bold leading-tight">{displayTitle}</h1>
                    <p className="text-sm text-muted-foreground mt-1">{displayInstitution}</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-full text-muted-foreground">
                        <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-full text-muted-foreground">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">4.8</span>
                    <span>(120)</span>
                </div>
                <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>1,247 studying</span>
                </div>
            </div>

            <button 
                onClick={() => setActiveTab("study")}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
                <Play className="w-4 h-4 fill-current" />
                Start Studying
            </button>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-border">
            {["overview", "study", "collaborate"].map((tab) => (
                <button
                    key={tab}
                    onClick={() => setActiveTab(tab as Tab)}
                    className={clsx(
                        "flex-1 py-3 text-sm font-medium border-b-2 transition-colors capitalize",
                        activeTab === tab
                            ? "border-primary text-primary"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                    )}
                >
                    {tab}
                </button>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 bg-muted/10 overflow-y-auto">
        {activeTab === "overview" && (
            <div className="space-y-6">
                <div className="bg-card rounded-xl p-4 border border-border shadow-sm">
                    <h3 className="font-bold mb-2">About This Course</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {displayDesc}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-card rounded-xl p-3 border border-border flex flex-col items-center justify-center text-center">
                        <BookOpen className="w-6 h-6 text-primary mb-1" />
                        <div className="font-bold text-lg">{course?.track.modules.length || 12}</div>
                        <div className="text-xs text-muted-foreground">Modules</div>
                    </div>
                    <div className="bg-card rounded-xl p-3 border border-border flex flex-col items-center justify-center text-center">
                        <div className="font-bold text-lg">{displayFlashcards}</div>
                        <div className="text-xs text-muted-foreground">Flashcards</div>
                    </div>
                    <div className="bg-card rounded-xl p-3 border border-border flex flex-col items-center justify-center text-center">
                        <div className="font-bold text-lg">{displayQuestions}</div>
                        <div className="text-xs text-muted-foreground">Questions</div>
                    </div>
                    <div className="bg-card rounded-xl p-3 border border-border flex flex-col items-center justify-center text-center">
                        <Clock className="w-6 h-6 text-primary mb-1" />
                        <div className="font-bold text-lg">~10h</div>
                        <div className="text-xs text-muted-foreground">Time</div>
                    </div>
                </div>
            </div>
        )}

        {activeTab === "study" && (
            <div className="absolute inset-0 z-50 bg-background flex flex-col">
                {/* Study Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-card">
                    <button 
                        onClick={() => setActiveTab("overview")}
                        className="p-2 hover:bg-muted rounded-full text-muted-foreground"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="text-center">
                        <h2 className="font-bold text-sm">Quiz Mode</h2>
                        <p className="text-xs text-muted-foreground">{currentQuestionIndex + 1} of {allQuestions.length}</p>
                    </div>
                    <div className="w-9 h-9" /> {/* Spacer */}
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                    {course && currentQuestion ? (
                        <div className="max-w-md mx-auto h-full flex flex-col">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium capitalize">{currentQuestion.difficulty}</span>
                                <ProgressBar progress={((currentQuestionIndex + 1) / allQuestions.length) * 100} className="w-24 h-2" />
                            </div>

                            <div className="flex-1 flex flex-col gap-4">
                                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                                    <h3 className="text-lg font-medium mb-6 leading-relaxed">{currentQuestion.text}</h3>
                                    
                                    <div className="space-y-3">
                                        {currentQuestion.options.map((option: any, idx: number) => (
                                            <button
                                                key={idx}
                                                onClick={() => setShowAnswer(true)}
                                                disabled={showAnswer}
                                                className={clsx(
                                                    "w-full p-4 rounded-xl text-left text-sm border transition-all",
                                                    showAnswer && option.isCorrect 
                                                        ? "bg-green-50 border-green-200 text-green-800"
                                                        : showAnswer && !option.isCorrect
                                                        ? "opacity-50 border-border"
                                                        : "bg-muted/30 border-border hover:bg-muted/50 hover:border-primary/50"
                                                )}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className={clsx(
                                                        "w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5",
                                                        showAnswer && option.isCorrect ? "border-green-500 bg-green-500 text-white" : "border-muted-foreground"
                                                    )}>
                                                        {showAnswer && option.isCorrect && <CheckCircle className="w-3 h-3" />}
                                                    </div>
                                                    <div>
                                                        <span className="font-medium leading-normal">{option.text}</span>
                                                        {showAnswer && option.isCorrect && (
                                                            <div className="mt-3 pt-3 border-t border-green-200">
                                                                <p className="text-xs text-green-700 font-medium leading-relaxed">{option.explanation}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {showAnswer && (
                                    <button 
                                        onClick={handleNextQuestion}
                                        className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20 mb-4"
                                    >
                                        Next Question
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-muted-foreground">No questions available for this course.</p>
                            <button onClick={() => setActiveTab("overview")} className="text-primary mt-4 font-medium">Go Back</button>
                        </div>
                    )}
                </div>
            </div>
        )}

        {activeTab === "collaborate" && (
            <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30">
                        <h3 className="font-bold">Top Contributors</h3>
                    </div>
                    <div className="divide-y divide-border">
                        <div className="p-3 flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">SC</div>
                            <div className="flex-1">
                                <div className="font-medium text-sm">Sarah Chen</div>
                                <div className="text-xs text-muted-foreground">47 contributions • Active 2h ago</div>
                            </div>
                            <div className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">#1</div>
                        </div>
                        <div className="p-3 flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">JW</div>
                            <div className="flex-1">
                                <div className="font-medium text-sm">James Wu</div>
                                <div className="text-xs text-muted-foreground">23 contributions • Active yesterday</div>
                            </div>
                            <div className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-full">#2</div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold px-1">Recent Activity</h3>
                    
                    <div className="bg-card rounded-xl border border-border p-4 shadow-sm">
                        <div className="flex gap-3">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">SC</div>
                            <div>
                                <p className="text-sm"><span className="font-bold">Sarah</span> added 5 flashcards to <span className="font-medium text-primary">Chapter 4</span></p>
                                <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
}
