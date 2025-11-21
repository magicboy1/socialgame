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
}

export function DraggableQuestionCard({ question, isDragging, disabled = false }: DraggableQuestionCardProps) {
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
          scale: isDragging ? 1.1 : 1,
          rotate: isDragging ? 3 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <Card
          className={`
            p-10 md:p-16 rounded-[2rem] border-4 
            ${
              isDragging
                ? "shadow-2xl border-[#2D8B7E] bg-[#F5EDD5] ring-8 ring-[#2D8B7E]/30"
                : "shadow-xl border-[#2D8B7E]/20 bg-[#F5EDD5]"
            }
          `}
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              animate={{
                y: isDragging ? 0 : [0, -8, 0],
              }}
              transition={{
                duration: 2,
                repeat: isDragging ? 0 : Infinity,
                ease: "easeInOut",
              }}
            >
              <Move
                className={`w-16 h-16 ${isDragging ? "text-[#2D8B7E]" : "text-[#2D8B7E]/60"}`}
                strokeWidth={3}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl md:text-3xl font-bold text-[#2D8B7E] text-center"
            >
              هل هذا التصرف آمن أم خطير؟
            </motion.p>

            <h2
              className="text-3xl md:text-5xl font-bold text-foreground leading-relaxed text-center min-h-[100px] flex items-center justify-center px-4"
              data-testid="text-scenario"
            >
              {question.scenario}
            </h2>

            {!isDragging && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl md:text-2xl font-bold text-[#2D8B7E]/70 text-center"
              >
                اسحب البطاقة للأسفل ↓
              </motion.p>
            )}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
