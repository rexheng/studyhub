import React from "react";
import { Search, Plus, Filter } from "lucide-react";
import { CourseCard } from "./shared/CourseCard";

interface CourseSearchProps {
  courses: any[];
  onNavigateToCreate: () => void;
  onNavigateToView: (courseId: string) => void;
}

export function CourseSearch({ courses, onNavigateToCreate, onNavigateToView }: CourseSearchProps) {
  return (
    <div className="space-y-6 pb-24 p-4">
      {/* Header */}
      <div className="px-1">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Discover Courses</h1>
          <button
            onClick={onNavigateToCreate}
            className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search courses, topics..."
            className="w-full pl-11 pr-4 h-12 bg-card border border-border/50 rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar -mx-1 px-1">
            {["All", "Economics", "Finance", "Law", "Management"].map((filter) => (
                <button 
                    key={filter}
                    className="px-4 py-2 bg-card border border-border/50 rounded-full text-sm font-medium whitespace-nowrap hover:bg-secondary transition-colors shadow-sm"
                >
                    {filter}
                </button>
            ))}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Popular Courses</h2>
            <button className="text-sm text-primary font-medium hover:text-primary/80">
                View All
            </button>
        </div>

        <div className="grid gap-4">
          {courses.map((course, index) => (
            <CourseCard
              key={course.track.slug}
              title={course.track.title}
              institution="Rex Finance"
              rating={5.0}
              reviews={120}
              flashcards={course.track.modules.reduce((acc: number, m: any) => acc + m.lessons.reduce((lAcc: number, l: any) => lAcc + (l.questions?.length || 0), 0), 0)}
              questions={course.track.modules.reduce((acc: number, m: any) => acc + m.lessons.reduce((lAcc: number, l: any) => lAcc + (l.questions?.length || 0), 0), 0)}
              contributors={1}
              onClick={() => onNavigateToView(course.track.slug)}
            />
          ))}
          
          <CourseCard
            title="EC201: Microeconomics"
            institution="LSE"
            rating={4.8}
            reviews={234}
            flashcards={1247}
            questions={432}
            contributors={23}
            onClick={() => onNavigateToView("ec201")}
          />
        </div>
        
        {/* Empty State Prompt */}
        <div className="mt-8 p-8 text-center border-2 border-dashed border-border/50 rounded-3xl bg-card/50">
            <p className="text-muted-foreground mb-4 font-medium">Can't find your course?</p>
            <button 
                onClick={onNavigateToCreate}
                className="px-6 py-2.5 bg-primary/10 text-primary font-semibold rounded-xl hover:bg-primary/20 transition-colors"
            >
                Create New Course
            </button>
        </div>
      </div>
    </div>
  );
}
