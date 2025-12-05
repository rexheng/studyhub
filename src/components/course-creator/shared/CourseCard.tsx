import React from "react";
import { Star, Users, BookOpen, HelpCircle } from "lucide-react";

interface CourseCardProps {
  title: string;
  institution: string;
  rating: number;
  reviews: number;
  flashcards: number;
  questions: number;
  contributors: number;
  onClick: () => void;
}

export function CourseCard({
  title,
  institution,
  rating,
  reviews,
  flashcards,
  questions,
  contributors,
  onClick,
}: CourseCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden group"
    >
      <div className="h-32 bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors relative">
         <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium border border-border/50">
            {institution}
         </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
        
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium text-foreground">{rating}</span>
          <span>({reviews})</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            {flashcards} cards
          </div>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            {questions} qs
          </div>
          <div className="flex items-center gap-1.5 col-span-2">
            <Users className="w-3.5 h-3.5" />
            {contributors} contributors
          </div>
        </div>

        <button className="w-full py-2 bg-secondary/50 hover:bg-secondary text-secondary-foreground rounded-lg text-sm font-medium transition-colors">
          View Course
        </button>
      </div>
    </div>
  );
}
