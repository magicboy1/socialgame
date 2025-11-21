import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

interface AnswerButtonProps {
  label: string;
  value: boolean;
  onClick: () => void;
}

export function AnswerButton({ label, value, onClick }: AnswerButtonProps) {
  const isSafe = value === true;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full"
    >
      <Button
        onClick={onClick}
        className={`
          w-full h-24 md:h-28 text-3xl md:text-4xl font-bold rounded-3xl shadow-2xl border-4
          ${
            isSafe
              ? "bg-[#2D8B7E] hover:bg-[#2D8B7E]/90 text-white border-[#2D8B7E]"
              : "bg-[#E85D5D] hover:bg-[#E85D5D]/90 text-white border-[#E85D5D]"
          }
        `}
        data-testid={`button-answer-${value ? "safe" : "unsafe"}`}
      >
        <span className="flex items-center gap-4">
          {isSafe ? (
            <Check className="w-10 h-10" strokeWidth={4} />
          ) : (
            <X className="w-10 h-10" strokeWidth={4} />
          )}
          {label}
        </span>
      </Button>
    </motion.div>
  );
}
