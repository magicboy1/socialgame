import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Home, Maximize, Minimize } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { MultipleChoiceQuestion } from "@/components/MultipleChoiceQuestion";
import { FeedbackScreen } from "@/components/FeedbackScreen";
import { CompletionScreen } from "@/components/CompletionScreen";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const [showHomeDialog, setShowHomeDialog] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

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

  const handleHomeClick = () => {
    setShowHomeDialog(true);
  };

  const handleConfirmHome = () => {
    setShowHomeDialog(false);
    handleRestart();
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
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

          {/* Score and Home Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              onClick={handleHomeClick}
              size="icon"
              variant="ghost"
              className="hover-elevate active-elevate-2 h-10 w-10 sm:h-12 sm:w-12 rounded-lg"
              style={{
                background: 'rgba(20, 25, 45, 0.5)',
                border: '2px solid hsl(165, 75%, 50%)',
                color: 'hsl(165, 75%, 50%)',
                backdropFilter: 'blur(8px)',
              }}
              data-testid="button-home"
            >
              <Home className="w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
            <ScoreDisplay score={score} animate={animateScore} />
          </div>
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

      {/* Fullscreen Button - Bottom Left */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-50"
      >
        <Button
          onClick={toggleFullscreen}
          size="icon"
          variant="ghost"
          className="hover-elevate active-elevate-2 h-10 w-10 sm:h-11 sm:w-11 rounded-lg"
          style={{
            background: 'rgba(20, 25, 45, 0.7)',
            border: '2px solid hsl(165, 75%, 50%)',
            color: 'hsl(165, 75%, 50%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 15px hsl(165 75% 50% / 0.3)',
          }}
          data-testid="button-fullscreen"
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5 sm:w-5 sm:h-5" />
          ) : (
            <Maximize className="w-5 h-5 sm:w-5 sm:h-5" />
          )}
        </Button>
      </motion.div>

      {/* Home Confirmation Dialog */}
      <AlertDialog open={showHomeDialog} onOpenChange={setShowHomeDialog}>
        <AlertDialogContent
          dir="rtl"
          className="rounded-2xl border-4"
          style={{
            background: 'linear-gradient(135deg, hsl(230, 35%, 7%) 0%, hsl(260, 40%, 12%) 100%)',
            borderColor: 'hsl(165, 75%, 50%)',
            boxShadow: '0 0 40px hsl(165 75% 50% / 0.3)',
          }}
        >
          <AlertDialogHeader>
            <AlertDialogTitle 
              className="text-2xl sm:text-3xl font-black text-brand text-center"
              style={{ textShadow: '0 0 15px hsl(165 75% 50% / 0.5)' }}
            >
              هل تريد الخروج؟
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base sm:text-lg text-white text-center font-bold mt-4">
              سيتم فقدان تقدمك الحالي في اللعبة
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <div className="flex flex-row gap-3 sm:gap-4 justify-center items-center w-full">
              <AlertDialogAction
                onClick={handleConfirmHome}
                className="m-0 px-6 sm:px-8 py-3 text-base sm:text-lg font-black rounded-xl"
                style={{
                  background: 'hsl(0, 70%, 50%)',
                  color: 'white',
                  border: '3px solid hsl(0, 80%, 60%)',
                  direction: 'rtl',
                }}
                data-testid="button-confirm-home"
              >
                نعم، اخرج
              </AlertDialogAction>
              <AlertDialogCancel
                className="btn-brand m-0 px-6 sm:px-8 py-3 text-base sm:text-lg font-black rounded-xl"
                style={{ direction: 'rtl' }}
                data-testid="button-cancel-home"
              >
                إلغاء
              </AlertDialogCancel>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
