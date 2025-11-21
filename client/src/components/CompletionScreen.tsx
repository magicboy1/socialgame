import { motion } from "framer-motion";
import { Trophy, Star, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mascot } from "./Mascot";

interface CompletionScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function CompletionScreen({ score, totalQuestions, onRestart }: CompletionScreenProps) {
  const percentage = (score / totalQuestions) * 100;
  const stars = percentage >= 80 ? 3 : percentage >= 60 ? 2 : 1;

  const getMessage = () => {
    if (percentage === 100) return "نتيجة مثالية! أنت بطل أمان حقيقي!";
    if (percentage >= 80) return "ممتاز! أنت تعرف قواعد الأمان جيداً!";
    if (percentage >= 60) return "جهد رائع! أنت تتعلم الكثير!";
    return "محاولة جيدة! كل سؤال يعلمك شيئاً جديداً!";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-[#7ED4C8] via-[#6BC9BD] to-[#5BBFB3]"
      data-testid="completion-screen"
    >
      <Card className="max-w-3xl w-full p-8 md:p-12 rounded-3xl shadow-2xl border-4 relative overflow-hidden bg-white">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1],
              opacity: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 400],
              y: [0, -200 - Math.random() * 200],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 3,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Sparkles className="w-4 h-4 text-[#FFD700]" />
          </motion.div>
        ))}

        <div className="flex flex-col items-center gap-8 text-center relative z-10">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 12,
            }}
            className="relative"
          >
            <Trophy className="w-36 h-36 text-[#FFD700]" strokeWidth={2} />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <Sparkles className="w-12 h-12 text-[#FFD700] absolute -top-4 -right-4" />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#2D8B7E]">
              مبروك!
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-foreground" data-testid="text-completion-message">
              {getMessage()}
            </p>
          </motion.div>

          <div className="flex gap-3">
            {Array.from({ length: stars }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.5 + i * 0.15,
                }}
              >
                <Star className="w-20 h-20 fill-[#FFD700] text-[#FFD700] drop-shadow-lg" />
              </motion.div>
            ))}
          </div>

          <div className="bg-[#F5EDD5] rounded-3xl p-10 w-full border-4 border-[#2D8B7E]/30">
            <p className="text-4xl font-bold text-foreground mb-2">
              النتيجة النهائية
            </p>
            <p className="text-6xl font-bold text-[#2D8B7E]" data-testid="text-final-score">
              {score}/{totalQuestions}
            </p>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
          >
            <Mascot
              size="large"
              animate={true}
              message="أنت الآن بطل الأمان! تذكر ما تعلمته!"
            />
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="w-full"
          >
            <Button
              onClick={onRestart}
              size="lg"
              className="h-20 px-16 text-2xl font-bold rounded-2xl shadow-lg gap-4 w-full md:w-auto bg-[#2D8B7E] hover:bg-[#2D8B7E]/90"
              data-testid="button-restart"
            >
              <RotateCcw className="w-7 h-7" />
              العب مرة أخرى
            </Button>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
