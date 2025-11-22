import { motion } from "framer-motion";
import type { Question } from "@shared/schema";
import { Check, X } from "lucide-react";

interface MultipleChoiceQuestionProps {
  question: Question;
  onAnswer: (choiceNumber: number) => void;
  selectedAnswer: number | null;
  showResult: boolean;
  isCorrect: boolean | null;
  disabled: boolean;
}

const choiceLetters = ["أ", "ب", "ج", "د"];

export function MultipleChoiceQuestion({
  question,
  onAnswer,
  selectedAnswer,
  showResult,
  isCorrect,
  disabled,
}: MultipleChoiceQuestionProps) {
  const choices = [
    { number: 1, text: question.choice1 },
    { number: 2, text: question.choice2 },
    { number: 3, text: question.choice3 },
    { number: 4, text: question.choice4 },
  ];

  const getButtonClass = (choiceNumber: number) => {
    const baseClass = "btn-choice w-full h-16 sm:h-20 md:h-24 rounded-lg sm:rounded-xl flex items-center gap-3 sm:gap-4 px-4 sm:px-6 md:px-8 text-right";
    
    if (!showResult) {
      return baseClass;
    }
    
    if (choiceNumber === question.correctAnswer) {
      return `${baseClass} btn-choice-correct`;
    }
    
    if (selectedAnswer === choiceNumber && !isCorrect) {
      return `${baseClass} btn-choice-wrong`;
    }
    
    return baseClass;
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6" dir="rtl">
      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-dramatic rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-6 sm:mb-8"
        data-testid="question-card"
      >
        <p 
          className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-relaxed"
          style={{
            textShadow: '0 0 20px rgba(212, 175, 55, 0.3), 2px 2px 8px rgba(0, 0, 0, 0.8)',
          }}
        >
          {question.scenario}
        </p>
      </motion.div>

      {/* Choice Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
        {choices.map((choice, index) => (
          <motion.button
            key={choice.number}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => !disabled && !showResult && onAnswer(choice.number)}
            disabled={disabled || showResult}
            className={getButtonClass(choice.number)}
            data-testid={`choice-${choice.number}`}
          >
            {/* Letter Circle */}
            <div 
              className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-black text-lg sm:text-xl md:text-2xl border-2 sm:border-3"
              style={{
                background: 'linear-gradient(135deg, hsl(45 100% 55%), hsl(40 90% 48%))',
                color: 'hsl(230 35% 7%)',
                borderColor: 'hsl(50 100% 65%)',
                boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)',
              }}
            >
              {choiceLetters[index]}
            </div>

            {/* Choice Text */}
            <span className="flex-1 text-sm sm:text-base md:text-xl lg:text-2xl font-semibold text-white">
              {choice.text}
            </span>

            {/* Result Icon */}
            {showResult && choice.number === question.correctAnswer && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Check className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-green-400" strokeWidth={3} />
              </motion.div>
            )}

            {showResult && selectedAnswer === choice.number && !isCorrect && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <X className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-red-400" strokeWidth={3} />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
