import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { DraggableQuestionCard } from "@/components/DraggableQuestionCard";
import { DropZone } from "@/components/DropZone";
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
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  const { data: questions = [], isLoading } = useQuery<Question[]>({
    queryKey: ["/api/questions"],
    enabled: gamePhase !== "welcome",
  });

  const submitAnswerMutation = useMutation({
    mutationFn: async (answer: boolean) => {
      const question = questions[currentQuestionIndex];
      const response = await apiRequest("POST", "/api/answer", {
        questionId: question.id,
        userAnswer: answer,
      });
      return await response.json();
    },
    onSuccess: (result: AnswerResult) => {
      setFeedbackData(result);
      setGamePhase("feedback");
      setIsSubmitting(false);
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

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: any) => {
    setOverId(event.over?.id || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    
    if (over && gamePhase === "playing" && !submitAnswerMutation.isPending) {
      setIsSubmitting(true);
      setActiveId(null);
      setOverId(null);
      const answer = over.id === "safe" ? true : false;
      submitAnswerMutation.mutate(answer);
    } else {
      setActiveId(null);
      setOverId(null);
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverId(null);
  };

  const handleContinue = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setGamePhase("playing");
      setFeedbackData(null);
      setIsSubmitting(false);
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
  const isDragEnabled = gamePhase === "playing" && !submitAnswerMutation.isPending && !isSubmitting;

  return (
    <>
      <div className="min-h-screen bg-[hsl(var(--teal))] p-3 sm:p-4 md:p-6 flex flex-col overflow-hidden">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6 relative"
          data-testid="game-header"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex-shrink-0">
              <Mascot size="small" animate={false} />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]" data-testid="text-game-title" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)' }}>
                في أمانتي الأمان
              </h1>
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight drop-shadow-[2px_2px_0px_rgba(0,0,0,0.3)]" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)' }}>
                السوشيال ميديا
              </h2>
            </div>
          </div>

          <ScoreDisplay score={score} animate={animateScore} />
        </motion.div>

        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full gap-4 sm:gap-6 md:gap-8">
            {!isSubmitting && (
              <motion.div 
                className="w-full max-w-2xl"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <DraggableQuestionCard 
                  question={currentQuestion} 
                  isDragging={activeId !== null}
                  disabled={!isDragEnabled}
                />
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full max-w-3xl ${!isDragEnabled ? 'opacity-50 pointer-events-none' : ''}`}
            >
              <DropZone id="safe" label="أمن" value={true} isOver={overId === "safe"} />
              <DropZone id="unsafe" label="غير أمن" value={false} isOver={overId === "unsafe"} />
            </motion.div>
          </div>

          <DragOverlay dropAnimation={null}>
            {activeId ? (
              <div style={{ cursor: 'grabbing' }}>
                <DraggableQuestionCard 
                  question={currentQuestion} 
                  isDragging={true} 
                  isOverDropZone={overId !== null}
                  isInOverlay={true}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>

      <AnimatePresence>
        {gamePhase === "feedback" && feedbackData && (
          <FeedbackScreen
            key={`feedback-${currentQuestionIndex}`}
            isCorrect={feedbackData.correct}
            tip={feedbackData.tip}
            onContinue={handleContinue}
          />
        )}
      </AnimatePresence>
    </>
  );
}
