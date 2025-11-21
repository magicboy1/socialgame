import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import type { Question } from "@shared/schema";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      data-testid="question-card"
      className="w-full"
    >
      <Card className="p-10 md:p-16 rounded-[2rem] shadow-2xl border-4 border-[#2D8B7E]/20 bg-[#F5EDD5]">
        <div className="flex flex-col items-center gap-8">
          <h2
            className="text-3xl md:text-5xl font-bold text-[#2D8B7E] leading-relaxed text-center min-h-[120px] flex items-center justify-center"
            data-testid="text-scenario"
          >
            {question.scenario}
          </h2>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-16 h-16 text-[#2D8B7E]" strokeWidth={4} />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
