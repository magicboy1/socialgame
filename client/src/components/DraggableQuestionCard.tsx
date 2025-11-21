import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Move } from "lucide-react";
import type { Question } from "@shared/schema";

interface DraggableQuestionCardProps {
  question: Question;
  isDragging: boolean;
  disabled?: boolean;
  isOverDropZone?: boolean;
}

export function DraggableQuestionCard({ question, isDragging, disabled = false, isOverDropZone = false }: DraggableQuestionCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "question-card",
    disabled,
  });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      data-testid="question-card"
      className="w-full cursor-grab active:cursor-grabbing touch-none"
    >
      <motion.div
        animate={{
          scale: isDragging ? (isOverDropZone ? 0.5 : 0.8) : 1,
          rotate: isDragging ? 3 : 0,
          opacity: isDragging ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        style={{
          pointerEvents: isDragging ? 'none' : 'auto',
        }}
      >
        <div
          className={`
            p-6 sm:p-8 md:p-10 rounded-[2rem] relative
            ${
              isDragging
                ? "shadow-[0_20px_50px_rgba(45,139,126,0.4)] bg-[#F5EDD5]"
                : "shadow-[0_10px_30px_rgba(0,0,0,0.15)] bg-[#F5EDD5]"
            }
          `}
        >
          <div className="flex flex-col items-center gap-4 sm:gap-6">
            <motion.div
              animate={{
                y: isDragging ? 0 : [0, -6, 0],
              }}
              transition={{
                duration: 2,
                repeat: isDragging ? 0 : Infinity,
                ease: "easeInOut",
              }}
            >
              <Move
                className={`w-10 h-10 sm:w-12 sm:h-12 ${isDragging ? "text-[#2D8B7E]" : "text-[#2D8B7E]/60"}`}
                strokeWidth={2.5}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-base sm:text-lg md:text-xl font-bold text-[#2D8B7E] text-center"
            >
              هل هذا التصرف آمن أم خطير؟
            </motion.p>

            <h2
              className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D8B7E] leading-relaxed text-center px-2 sm:px-4"
              data-testid="text-scenario"
            >
              {question.scenario}
            </h2>

            {!isDragging && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm sm:text-base md:text-lg font-semibold text-[#2D8B7E]/70 text-center"
              >
                ✋ اسحب البطاقة للأسفل
              </motion.p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
