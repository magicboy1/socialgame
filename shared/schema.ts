import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const questions = pgTable("questions", {
  id: integer("id").primaryKey(),
  scenario: text("scenario").notNull(),
  tip: text("tip").notNull(),
  correctAnswer: boolean("correct_answer").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
});

export const insertQuestionSchema = createInsertSchema(questions);

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export interface AnswerSubmission {
  questionId: number;
  userAnswer: boolean;
}

export interface AnswerResult {
  correct: boolean;
  correctAnswer: boolean;
  tip: string;
}
