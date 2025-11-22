import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import type { AnswerSubmission, AnswerResult } from "@shared/schema";
import { z } from "zod";

const answerSubmissionSchema = z.object({
  questionId: z.number().int().positive(),
  userAnswer: z.number().int().min(1).max(4),
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/questions", async (req, res) => {
    try {
      const questions = await storage.getAllQuestions();
      const shuffled = questions.sort(() => Math.random() - 0.5);
      res.json(shuffled);
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ error: "Failed to fetch questions" });
    }
  });

  app.post("/api/answer", async (req, res) => {
    try {
      const validationResult = answerSubmissionSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          error: "Invalid request body", 
          details: validationResult.error.errors 
        });
      }

      const { questionId, userAnswer } = validationResult.data;
      const question = await storage.getQuestion(questionId);
      
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      const isCorrect = userAnswer === question.correctAnswer;
      
      const result: AnswerResult = {
        correct: isCorrect,
        correctAnswer: question.correctAnswer,
        tip: question.tip,
      };

      res.json(result);
    } catch (error) {
      console.error("Error processing answer:", error);
      res.status(500).json({ error: "Failed to process answer" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
