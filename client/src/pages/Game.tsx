import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { MultipleChoiceQuestion } from "@/components/MultipleChoiceQuestion";
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
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const { data: questions = [], isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"],
    enabled: gamePhase !== "welcome",
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async (answer: number) => {
      const question = questions[currentQuestionIndex];
      const response = await apiRequest("POST", "/api/answer", {
        questionId: question.id,
        userAnswer: answer,
      });
      return await response.json();
    },
    onSuccess: (result: AnswerResult) => {
      setFeedbackData(result);
      setShowResult(true);
      
      // Show result on button for 1.5 seconds, then go to feedback screen
      setTimeout(() => {
        setGamePhase("feedback");
        if (result.correct) {
          setScore((prev) => prev + 1);
          setAnimateScore(true);
          setTimeout(() => setAnimateScore(false), 500);
        }
      }, 1500);
    },
  });

  const handleStartGame = () => {
    setGamePhase("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = (choiceNumber: number) => {
    if (submitAnswerMutation.isPending || showResult) return;
    
    setSelectedAnswer(choiceNumber);
    submitAnswerMutation.mutate(choiceNumber);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setGamePhase("playing");
      setFeedbackData(null);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGamePhase("completed");
    }
  };

  const handleRestart = () => {
    setGamePhase("welcome");
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedbackData(null);
    setSelectedAnswer(null);
    setShowResult(false);
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

  if (gamePhase === "feedback" && feedbackData) {
    return (
      <FeedbackScreen
        isCorrect={feedbackData.correct}
        tip={feedbackData.tip}
        onContinue={handleContinue}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
    );
  }

  if (isLoading || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[hsl(230,35%,7%)] to-[hsl(260,40%,12%)]">
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
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(230, 35%, 7%) 0%, hsl(260, 40%, 12%) 100%)' }}>
      {/* Animated spotlight beams */}
      <div className="spotlight-beam" style={{ animationDelay: '0s' }} />
      <div className="spotlight-beam" style={{ animationDelay: '4s' }} />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col p-3 sm:p-4 md:p-6">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-4 sm:mb-6 md:mb-8"
          data-testid="game-header"
        >
          {/* Progress */}
          <div className="flex items-center gap-2 sm:gap-3" dir="rtl">
            <div className="flex-shrink-0 hidden sm:block">
              <Mascot size="small" animate={false} />
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm md:text-lg font-bold text-brand" style={{ textShadow: '0 0 10px rgba(45, 200, 140, 0.5)' }}>
                السؤال {currentQuestionIndex + 1} من {questions.length}
              </p>
            </div>
          </div>

          {/* Score */}
          <ScoreDisplay score={score} animate={animateScore} />
        </motion.div>

        {/* Question Area */}
        <div className="flex-1 flex items-center justify-center">
          <MultipleChoiceQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            isCorrect={feedbackData?.correct ?? null}
            disabled={submitAnswerMutation.isPending || showResult}
          />
        </div>
      </div>
    </div>
  );
}
