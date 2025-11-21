import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { QuestionCard } from "@/components/QuestionCard";
import { AnswerButton } from "@/components/AnswerButton";
import { FeedbackScreen } from "@/components/FeedbackScreen";
import { CompletionScreen } from "@/components/CompletionScreen";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { Mascot } from "@/components/Mascot";
import type { Question, AnswerResult } from "@shared/schema";

type GamePhase = "welcome" | "playing" | "feedback" | "completed";

export default function Game() {
  const [gamePhase, setGamePhase] = useState<GamePhase>("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedbackData, setFeedbackData] = useState<AnswerResult | null>(null);
  const [animateScore, setAnimateScore] = useState(false);

  const { data: questions = [], isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"],
    enabled: gamePhase !== "welcome",
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async (answer: boolean) => {
      const question = questions[currentQuestionIndex];
      return apiRequest("POST", "/api/answer", {
        questionId: question.id,
        userAnswer: answer,
      });
    },
    onSuccess: (result: AnswerResult) => {
      setFeedbackData(result);
      setGamePhase("feedback");
      if (result.correct) {
        setScore((prev) => prev + 1);
        setAnimateScore(true);
        setTimeout(() => setAnimateScore(false), 500);
      }
    },
  });

  const handleStartGame = () => {
    setGamePhase("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = (answer: boolean) => {
    submitAnswerMutation.mutate(answer);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setGamePhase("playing");
      setFeedbackData(null);
    } else {
      setGamePhase("completed");
    }
  };

  const handleRestart = () => {
    setGamePhase("welcome");
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedbackData(null);
    queryClient.invalidateQueries({ queryKey: ["/api/questions"] });
  };

  if (gamePhase === "welcome") {
    return <WelcomeScreen onStart={handleStartGame} />;
  }

  if (gamePhase === "completed") {
    return (
      <CompletionScreen
        score={score}
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    );
  }

  if (isLoading || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#7ED4C8] via-[#6BC9BD] to-[#5BBFB3]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Mascot size="large" animate={false} />
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7ED4C8] via-[#6BC9BD] to-[#5BBFB3] p-4 md:p-6 flex flex-col">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between mb-6"
        data-testid="game-header"
      >
        <div className="flex items-center gap-3">
          <div className="absolute left-4 md:left-8 top-4 md:top-6">
            <Mascot size="small" animate={false} />
          </div>
          <div className="mr-24 md:mr-32">
            <h1 className="text-2xl md:text-4xl font-bold text-[#2D8B7E] leading-tight" data-testid="text-game-title">
              في أمانتي الأمان
            </h1>
            <h2 className="text-xl md:text-3xl font-bold text-[#2D8B7E] leading-tight">
              السوشيال ميديا
            </h2>
          </div>
        </div>

        <ScoreDisplay score={score} animate={animateScore} />
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full gap-6">
        <QuestionCard question={currentQuestion} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl"
        >
          <AnswerButton
            label="أمن"
            value={true}
            onClick={() => handleAnswer(true)}
          />
          <AnswerButton
            label="غير أمن"
            value={false}
            onClick={() => handleAnswer(false)}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {gamePhase === "feedback" && feedbackData && (
          <FeedbackScreen
            isCorrect={feedbackData.correct}
            tip={feedbackData.tip}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
