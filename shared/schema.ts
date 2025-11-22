import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const questions = pgTable("questions", {
  id: integer("id").primaryKey(),
  scenario: text("scenario").notNull(),
  choice1: text("choice1").notNull(),
  choice2: text("choice2").notNull(),
  choice3: text("choice3").notNull(),
  choice4: text("choice4").notNull(),
  correctAnswer: integer("correct_answer").notNull(),
  tip: text("tip").notNull(),
  category: varchar("category", { length: 50 }).notNull(),
});

export const insertQuestionSchema = createInsertSchema(questions);

export type Question = typeof questions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;

export interface AnswerSubmission {
  questionId: number;
  userAnswer: number;
}

export interface AnswerResult {
  correct: boolean;
  correctAnswer: number;
  tip: string;
}
