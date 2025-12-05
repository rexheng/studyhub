import { db } from './index';
import { tracks, modules, lessons, questions, options } from './schema';
import fs from 'fs';
import path from 'path';
import { z } from 'zod';

// Zod Schema for Validation
const OptionSchema = z.object({
  text: z.string(),
  isCorrect: z.boolean(),
  explanation: z.string().optional(),
});

const QuestionSchema = z.object({
  text: z.string(),
  type: z.enum(['multiple_choice', 'true_false']).default('multiple_choice'),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  options: z.array(OptionSchema),
});

const LessonSchema = z.object({
  title: z.string(),
  slug: z.string(),
  order: z.number(),
  content: z.string(),
  questions: z.array(QuestionSchema).optional(),
});

const ModuleSchema = z.object({
  title: z.string(),
  description: z.string(),
  order: z.number(),
  slug: z.string(),
  lessons: z.array(LessonSchema),
});

const TrackSchema = z.object({
  title: z.string(),
  description: z.string(),
  slug: z.string(),
  modules: z.array(ModuleSchema),
});

const ContentFileSchema = z.object({
  track: TrackSchema,
});

async function seed() {
  const contentPath = path.join(process.cwd(), 'content-template.json'); // Default to template for now, can be argument
  
  if (!fs.existsSync(contentPath)) {
    console.error('Content file not found:', contentPath);
    process.exit(1);
  }

  const rawData = fs.readFileSync(contentPath, 'utf-8');
  const json = JSON.parse(rawData);

  // Validate JSON
  const result = ContentFileSchema.safeParse(json);
  
  if (!result.success) {
    console.error('Validation failed:', result.error.format());
    process.exit(1);
  }

  const data = result.data;

  console.log(`Seeding track: ${data.track.title}`);

  // 1. Insert Track
  const [track] = await db.insert(tracks).values({
    title: data.track.title,
    description: data.track.description,
    slug: data.track.slug,
  }).returning().onConflictDoUpdate({
    target: tracks.slug,
    set: { title: data.track.title, description: data.track.description }
  });

  console.log(`Track ID: ${track.id}`);

  // 2. Insert Modules
  for (const mod of data.track.modules) {
    const [moduleRecord] = await db.insert(modules).values({
      trackId: track.id,
      title: mod.title,
      description: mod.description,
      order: mod.order,
      slug: mod.slug,
    }).returning().onConflictDoUpdate({
      target: modules.slug,
      set: { title: mod.title, description: mod.description, order: mod.order }
    });

    console.log(`  Module: ${mod.title}`);

    // 3. Insert Lessons
    for (const lesson of mod.lessons) {
      const [lessonRecord] = await db.insert(lessons).values({
        moduleId: moduleRecord.id,
        title: lesson.title,
        content: lesson.content,
        order: lesson.order,
        slug: lesson.slug,
      }).returning().onConflictDoUpdate({
        target: lessons.slug,
        set: { title: lesson.title, content: lesson.content, order: lesson.order }
      });

      console.log(`    Lesson: ${lesson.title}`);

      // 4. Insert Questions
      if (lesson.questions) {
        for (const q of lesson.questions) {
          const [questionRecord] = await db.insert(questions).values({
            lessonId: lessonRecord.id,
            text: q.text,
            type: q.type,
            difficulty: q.difficulty,
          }).returning();

          // 5. Insert Options
          if (q.options) {
            await db.insert(options).values(
              q.options.map(opt => ({
                questionId: questionRecord.id,
                text: opt.text,
                isCorrect: opt.isCorrect,
                explanation: opt.explanation,
              }))
            );
          }
        }
      }
    }
  }

  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding error:', err);
  process.exit(1);
});
