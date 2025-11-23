import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "./Mascot";

interface FeedbackScreenProps {
  isCorrect: boolean;
  tip: string;
  onContinue: () => void;
  currentQuestion: number;
  totalQuestions: number;
}

const encouragingMessages = {
  correct: [
    "أنت نجم الأمان!",
    "اختيار رائع!",
    "أصبحت خبيراً في الأمان!",
    "ممتاز! استمر!",
  ],
  incorrect: [
    "لا بأس! التعلم مهم!",
    "محاولة جيدة! دعنا نتعلم معاً!",
    "لا تقلق! الآن أنت تعرف!",
  ],
};

export function FeedbackScreen({ isCorrect, tip, onContinue, currentQuestion, totalQuestions }: FeedbackScreenProps) {
  const mascotMessage = isCorrect
    ? encouragingMessages.correct[Math.floor(Math.random() * encouragingMessages.correct.length)]
    : encouragingMessages.incorrect[Math.floor(Math.random() * encouragingMessages.incorrect.length)];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 sm:p-6"
      style={{ 
        background: isCorrect 
          ? 'linear-gradient(135deg, hsl(145, 65%, 15%) 0%, hsl(145, 50%, 8%) 100%)'
          : 'linear-gradient(135deg, hsl(0, 75%, 15%) 0%, hsl(0, 60%, 8%) 100%)'
      }}
      data-testid="feedback-screen"
    >
      {/* Animated spotlight beams */}
      <div className="spotlight-beam" style={{ 
        background: isCorrect 
          ? 'linear-gradient(90deg, transparent, hsl(145 65% 45% / 0.2), transparent)'
          : 'linear-gradient(90deg, transparent, hsl(0 75% 45% / 0.2), transparent)'
      }} />
      
      {/* Celebration particles */}
      {isCorrect && Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ scale: 0, x: '50vw', y: '50vh' }}
          animate={{
            scale: [0, 1, 1],
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.05,
            ease: "easeOut",
          }}
        >
          <Star className="w-4 h-4 sm:w-6 sm:h-6 fill-[hsl(165,75%,50%)] text-[hsl(165,75%,50%)]" />
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl w-full">
        <div className="card-dramatic rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
            
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: isCorrect ? -180 : 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
            >
              {isCorrect ? (
                <div className="relative">
                  <CheckCircle2 className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32" style={{ color: 'hsl(145, 65%, 45%)' }} strokeWidth={2.5} />
                  <motion.div
                    className="absolute inset-0"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 absolute -top-2 -right-2" style={{ color: 'hsl(165, 75%, 50%)' }} />
                  </motion.div>
                </div>
              ) : (
                <XCircle className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32" style={{ color: 'hsl(0, 75%, 45%)' }} strokeWidth={2.5} />
              )}
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-4"
                style={{
                  color: isCorrect ? 'hsl(145, 65%, 55%)' : 'hsl(0, 75%, 55%)',
                  textShadow: '0 0 30px currentColor, 4px 4px 0px rgba(0, 0, 0, 0.8)'
                }}
                data-testid="text-feedback-title"
              >
                {isCorrect ? "إجابة صحيحة! 🎉" : "إجابة خاطئة 😔"}
              </h2>
              
              <p className="text-base sm:text-xl md:text-2xl font-bold text-brand">
                {mascotMessage}
              </p>
            </motion.div>

            {/* Tip */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <div
                className="rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10"
                style={{
                  background: 'rgba(20, 25, 45, 0.6)',
                  border: `3px solid ${isCorrect ? 'hsl(145, 65%, 45%)' : 'hsl(0, 75%, 45%)'}`,
                  boxShadow: `0 0 40px ${isCorrect ? 'hsl(145 65% 45% / 0.3)' : 'hsl(0 75% 45% / 0.3)'}`,
                }}
              >
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4 text-brand">
                  {isCorrect ? "لماذا هذا صحيح؟" : "لماذا هذا خطأ؟"}
                </h3>
                <p
                  className="text-base sm:text-lg md:text-2xl font-bold leading-relaxed text-white text-right"
                  data-testid="text-tip"
                  dir="rtl"
                >
                  {tip}
                </p>
              </div>
            </motion.div>

            {/* Continue Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="w-full flex flex-col items-center gap-3"
            >
              <p className="text-sm sm:text-base md:text-lg font-bold text-brand">
                السؤال {currentQuestion} من {totalQuestions}
              </p>
              <Button
                onClick={onContinue}
                size="lg"
                className="btn-brand h-14 sm:h-16 md:h-20 px-8 sm:px-12 md:px-16 text-base sm:text-xl md:text-2xl font-black rounded-xl sm:rounded-2xl w-full sm:w-auto"
                data-testid="button-continue"
                style={{ direction: 'rtl' }}
              >
                {currentQuestion < totalQuestions ? 'السؤال التالي' : 'النتيجة النهائية'}
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
