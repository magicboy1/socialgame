import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mascot } from "./Mascot";

interface FeedbackScreenProps {
  isCorrect: boolean;
  tip: string;
  onContinue: () => void;
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

export function FeedbackScreen({ isCorrect, tip, onContinue }: FeedbackScreenProps) {
  const mascotMessage = isCorrect
    ? encouragingMessages.correct[Math.floor(Math.random() * encouragingMessages.correct.length)]
    : encouragingMessages.incorrect[Math.floor(Math.random() * encouragingMessages.incorrect.length)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[hsl(var(--teal))]/95 backdrop-blur-sm p-6"
      data-testid="feedback-screen"
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <Card className="max-w-2xl w-full p-8 md:p-12 rounded-2xl border-[10px] border-[hsl(var(--navy))] relative overflow-visible bg-white" style={{ boxShadow: '0 8px 0px hsl(var(--orange-red))' }}>
        {isCorrect && (
          <>
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 1],
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, -100 - Math.random() * 100],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
                style={{
                  left: `${50 + (Math.random() - 0.5) * 20}%`,
                  top: "50%",
                }}
              >
                <Star className="w-6 h-6 fill-[#FFD700] text-[#FFD700]" />
              </motion.div>
            ))}
          </>
        )}

        <div className="flex flex-col items-center gap-8 text-center relative z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Mascot size="large" animate={isCorrect} message={mascotMessage} />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 15,
              delay: 0.3,
            }}
          >
            {isCorrect ? (
              <div className="relative">
                <CheckCircle2 className="w-28 h-28 text-[#2D8B7E]" strokeWidth={2.5} />
                <motion.div
                  className="absolute inset-0"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Sparkles className="w-10 h-10 text-[#FFD700] absolute -top-2 -right-2" />
                </motion.div>
              </div>
            ) : (
              <XCircle className="w-28 h-28 text-[#E85D5D]" strokeWidth={2.5} />
            )}
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h2
              className="text-5xl md:text-6xl font-extrabold"
              style={{
                color: isCorrect ? 'hsl(156 60% 35%)' : 'hsl(9 88% 50%)',
                textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)'
              }}
              data-testid="text-feedback-title"
            >
              {isCorrect ? "إجابة صحيحة! 🎉" : "إجابة خاطئة 😔"}
            </h2>

            <div
              className="rounded-xl p-10 bg-white border-[8px]"
              style={{
                borderColor: isCorrect ? 'hsl(156 60% 35%)' : 'hsl(9 88% 50%)',
                boxShadow: '0 6px 0px hsl(var(--yellow))'
              }}
            >
              <h3 className="text-3xl font-extrabold mb-4" style={{ color: 'hsl(var(--navy))', textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)' }}>
                {isCorrect ? "لماذا هذا صحيح؟" : "لماذا هذا خطأ؟"}
              </h3>
              <p
                className="text-2xl md:text-3xl font-bold leading-relaxed text-right"
                style={{ color: 'hsl(var(--navy))' }}
                data-testid="text-tip"
              >
                {tip}
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="w-full"
          >
            <Button
              onClick={onContinue}
              size="lg"
              className="h-20 px-12 text-2xl font-extrabold rounded-xl w-full md:w-auto bg-white text-[hsl(var(--navy))] border-[8px] border-[hsl(var(--navy))] hover:bg-[hsl(var(--yellow))]"
              data-testid="button-continue"
              style={{ boxShadow: '0 6px 0px hsl(var(--orange-red))', textShadow: '2px 2px 0px rgba(0, 0, 0, 0.15)' }}
            >
              متابعة التعلم
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
