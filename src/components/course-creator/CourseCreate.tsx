import React, { useState, useEffect } from "react";
import { ArrowLeft, Upload, FileText, CheckCircle, Loader2, Share2, Users, ChevronRight, X } from "lucide-react";
import { ProgressBar } from "./shared/ProgressBar";
import { clsx } from "clsx";

interface CourseCreateProps {
  onNavigateToSearch: () => void;
  onNavigateToView: () => void;
}

type Step = "upload" | "processing" | "review" | "share";

export function CourseCreate({ onNavigateToSearch, onNavigateToView }: CourseCreateProps) {
  const [step, setStep] = useState<Step>("upload");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingProgress, setProcessingProgress] = useState(0);

  // Simulate processing
  useEffect(() => {
    if (step === "processing") {
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStep("review"), 500);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  const handleFileUpload = () => {
    // Simulate upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setStep("processing"), 500);
      }
    }, 200);
  };

  return (
    <div className="max-w-md mx-auto bg-background flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center gap-4">
        <button onClick={onNavigateToSearch} className="p-1 hover:bg-muted rounded-full">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-lg">Create Course</h1>
          <div className="flex gap-1 mt-1">
            {["upload", "processing", "review", "share"].map((s, i) => (
              <div
                key={s}
                className={clsx(
                  "h-1 flex-1 rounded-full transition-colors",
                  ["upload", "processing", "review", "share"].indexOf(step) >= i
                    ? "bg-primary"
                    : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {step === "upload" && (
          <div className="space-y-6">
            <div 
                className="border-2 border-dashed border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-muted/30 transition-colors cursor-pointer group"
                onClick={handleFileUpload}
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Upload Course Materials</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Drag & drop PDF, PPT, or DOCX files here
              </p>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors">
                Browse Files
              </button>
            </div>

            {uploadProgress > 0 && (
                <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <FileText className="w-8 h-8 text-blue-500" />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">Lecture_1_Microeconomics.pdf</p>
                            <p className="text-xs text-muted-foreground">2.4 MB</p>
                        </div>
                        {uploadProgress === 100 ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                            <span className="text-xs font-medium">{uploadProgress}%</span>
                        )}
                    </div>
                    <ProgressBar progress={uploadProgress} />
                </div>
            )}

            <div className="space-y-4">
                <h3 className="font-bold">Course Details</h3>
                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Course Title</label>
                        <input type="text" placeholder="e.g. Microeconomics 101" className="w-full px-4 py-2 bg-muted/50 border-none rounded-lg text-sm" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">Institution</label>
                        <select className="w-full px-4 py-2 bg-muted/50 border-none rounded-lg text-sm">
                            <option>London School of Economics</option>
                            <option>Imperial College London</option>
                            <option>UCL</option>
                        </select>
                    </div>
                </div>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="flex flex-col items-center justify-center h-full space-y-8 py-12">
            <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                <Loader2 className="w-16 h-16 text-primary animate-spin relative z-10" />
            </div>
            
            <div className="text-center space-y-2">
                <h2 className="text-xl font-bold">Processing Your Content</h2>
                <p className="text-muted-foreground">AI is transforming your documents into study materials...</p>
            </div>

            <div className="w-full max-w-xs space-y-4">
                <div className="flex justify-between text-sm font-medium">
                    <span>Progress</span>
                    <span>{processingProgress}%</span>
                </div>
                <ProgressBar progress={processingProgress} className="h-3" />
                
                <div className="space-y-3 pt-4">
                    <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className={clsx("w-4 h-4", processingProgress > 20 ? "text-green-500" : "text-muted")} />
                        <span className={clsx(processingProgress > 20 ? "text-foreground" : "text-muted-foreground")}>Reading document</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className={clsx("w-4 h-4", processingProgress > 50 ? "text-green-500" : "text-muted")} />
                        <span className={clsx(processingProgress > 50 ? "text-foreground" : "text-muted-foreground")}>Extracting concepts</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <CheckCircle className={clsx("w-4 h-4", processingProgress > 80 ? "text-green-500" : "text-muted")} />
                        <span className={clsx(processingProgress > 80 ? "text-foreground" : "text-muted-foreground")}>Generating flashcards</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full mt-8">
                <div className="bg-card border border-border p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold text-primary">{Math.floor(processingProgress * 0.4)}</div>
                    <div className="text-xs text-muted-foreground">Flashcards</div>
                </div>
                <div className="bg-card border border-border p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold text-primary">{Math.floor(processingProgress * 0.2)}</div>
                    <div className="text-xs text-muted-foreground">Questions</div>
                </div>
                <div className="bg-card border border-border p-3 rounded-xl text-center">
                    <div className="text-2xl font-bold text-primary">{Math.floor(processingProgress * 0.8)}</div>
                    <div className="text-xs text-muted-foreground">Concepts</div>
                </div>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg">Review Content</h2>
                <div className="flex gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">Flashcards (42)</span>
                    <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">Questions (18)</span>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col justify-center text-center relative">
                <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 hover:bg-muted rounded-full text-muted-foreground hover:text-foreground transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Front</p>
                <h3 className="text-xl font-medium mb-8">What is Consumer Surplus?</h3>
                
                <div className="w-full h-px bg-border mb-8" />
                
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Back</p>
                <p className="text-muted-foreground">The difference between the total amount that consumers are willing and able to pay for a good or service and the total amount that they actually do pay.</p>
            </div>

            <div className="flex items-center justify-between gap-4">
                <button className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-muted/80">
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-sm font-medium text-muted-foreground">1 / 42</div>
                <button className="p-3 rounded-full bg-muted text-muted-foreground hover:bg-muted/80">
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>

            <div className="pt-4 border-t border-border">
                <button 
                    onClick={() => setStep("share")}
                    className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    Approve All & Continue
                </button>
            </div>
          </div>
        )}

        {step === "share" && (
          <div className="space-y-6">
            <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Course Ready!</h2>
                <p className="text-muted-foreground">Your course has been created successfully.</p>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold">Privacy Settings</h3>
                <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-primary bg-primary/5 rounded-xl cursor-pointer">
                        <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                            <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                        </div>
                        <div className="flex-1">
                            <div className="font-medium">Public</div>
                            <div className="text-xs text-muted-foreground">Anyone can find and study this course</div>
                        </div>
                        <Users className="w-5 h-5 text-primary" />
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-border rounded-xl cursor-pointer hover:bg-muted/30">
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                        <div className="flex-1">
                            <div className="font-medium">Private</div>
                            <div className="text-xs text-muted-foreground">Only invited users can access</div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-bold">Invite Collaborators</h3>
                <div className="flex gap-2">
                    <input type="email" placeholder="Enter email address" className="flex-1 px-4 py-2 bg-muted/50 border-none rounded-lg text-sm" />
                    <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm">Add</button>
                </div>
                
                <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-muted/20 rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold">SC</div>
                            <div className="text-sm">
                                <div className="font-medium">Sarah Chen</div>
                                <div className="text-xs text-muted-foreground">Editor</div>
                            </div>
                        </div>
                        <button className="text-xs text-red-500 font-medium">Remove</button>
                    </div>
                </div>
            </div>

            <div className="pt-8 flex gap-3">
                <button className="flex-1 py-3 bg-muted text-muted-foreground rounded-xl font-bold hover:bg-muted/80 transition-colors">
                    Save Draft
                </button>
                <button 
                    onClick={onNavigateToView}
                    className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                    <Share2 className="w-4 h-4" />
                    Publish
                </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
