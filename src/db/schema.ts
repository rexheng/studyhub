import { pgTable, serial, text, timestamp, integer, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const difficultyEnum = pgEnum('difficulty', ['easy', 'medium', 'hard']);
export const questionTypeEnum = pgEnum('question_type', ['multiple_choice', 'true_false']);

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const tracks = pgTable('tracks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const modules = pgTable('modules', {
  id: serial('id').primaryKey(),
  trackId: integer('track_id').references(() => tracks.id).notNull(),
  title: text('title').notNull(),
  description: text('description'),
  order: integer('order').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  moduleId: integer('module_id').references(() => modules.id).notNull(),
  title: text('title').notNull(),
  content: text('content'), // Markdown content
  order: integer('order').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  lessonId: integer('lesson_id').references(() => lessons.id).notNull(),
  text: text('text').notNull(),
  type: questionTypeEnum('type').default('multiple_choice').notNull(),
  difficulty: difficultyEnum('difficulty').default('medium').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const options = pgTable('options', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').references(() => questions.id).notNull(),
  text: text('text').notNull(),
  isCorrect: boolean('is_correct').default(false).notNull(),
  explanation: text('explanation'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const tracksRelations = relations(tracks, ({ many }) => ({
  modules: many(modules),
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  track: one(tracks, {
    fields: [modules.trackId],
    references: [tracks.id],
  }),
  lessons: many(lessons),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, {
    fields: [lessons.moduleId],
    references: [modules.id],
  }),
  questions: many(questions),
}));

export const questionsRelations = relations(questions, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [questions.lessonId],
    references: [lessons.id],
  }),
  options: many(options),
}));

export const optionsRelations = relations(options, ({ one }) => ({
  question: one(questions, {
    fields: [options.questionId],
    references: [questions.id],
  }),
}));
