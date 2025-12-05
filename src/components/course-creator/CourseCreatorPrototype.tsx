"use client";

import React, { useState, useEffect } from "react";
import { CourseSearch } from "./CourseSearch";
import { CourseCreate } from "./CourseCreate";
import { CourseView } from "./CourseView";

export type Page = "search" | "create" | "view";

export function CourseCreatorPrototype({ initialCourseId }: { initialCourseId?: string | null }) {
  const [page, setPage] = useState<Page>("search");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    if (initialCourseId && courses.length > 0) {
      const courseExists = courses.some(c => c.track.slug === initialCourseId);
      if (courseExists) {
        setSelectedCourseId(initialCourseId);
        setPage("view");
      }
    }
  }, [initialCourseId, courses]);

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setPage("view");
  };

  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading courses...</div>;
  }

  return (
    <div className="bg-background text-foreground font-sans h-full">
      {page === "search" && (
        <CourseSearch
          courses={courses}
          onNavigateToCreate={() => setPage("create")}
          onNavigateToView={(courseId) => handleSelectCourse(courseId)}
        />
      )}
      {page === "create" && (
        <CourseCreate
          onNavigateToSearch={() => setPage("search")}
          onNavigateToView={() => setPage("view")}
        />
      )}
      {page === "view" && (
        <CourseView
          courseId={selectedCourseId}
          courses={courses}
          onNavigateToSearch={() => setPage("search")}
        />
      )}
    </div>
  );
}
