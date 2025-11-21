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
  isInOverlay?: boolean;
}

export function DraggableQuestionCard({ question, isDragging, disabled = false, isOverDropZone = false, isInOverlay = false }: DraggableQuestionCardProps) {
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
          scale: isOverDropZone ? 0.5 : (isDragging ? 0.8 : 1),
          rotate: isDragging ? 3 : 0,
          opacity: (isDragging && !isInOverlay) ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <div
          className={`
            p-6 sm:p-8 md:p-10 rounded-xl relative bg-white border-[8px] border-[hsl(var(--navy))] transition-all duration-200
          `}
          style={{
            boxShadow: isDragging ? '0 8px 0px hsl(var(--orange-red))' : '0 6px 0px hsl(var(--yellow))',
          }}
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
                className={`w-10 h-10 sm:w-12 sm:h-12`}
                strokeWidth={2.5}
                style={{ color: 'hsl(var(--navy))' }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-base sm:text-lg md:text-xl font-extrabold text-center"
              style={{ color: 'hsl(var(--navy))', textShadow: '2px 2px 0px rgba(0, 0, 0, 0.15)' }}
            >
              هل هذا التصرف آمن أم خطير؟
            </motion.p>

            <h2
              className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-relaxed text-center px-2 sm:px-4"
              data-testid="text-scenario"
              style={{ color: 'hsl(var(--navy))', textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)' }}
            >
              {question.scenario}
            </h2>

            {!isDragging && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm sm:text-base md:text-lg font-bold text-center"
                style={{ color: 'hsl(var(--orange-red))', textShadow: '1px 1px 0px rgba(0, 0, 0, 0.15)' }}
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
