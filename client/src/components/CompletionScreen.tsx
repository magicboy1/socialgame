import { motion } from "framer-motion";
import { Trophy, Star, RotateCcw, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
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
      className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 sm:p-6"
      style={{ background: 'linear-gradient(135deg, hsl(230, 35%, 7%) 0%, hsl(260, 40%, 12%) 100%)' }}
      data-testid="completion-screen"
    >
      {/* Animated spotlight beams */}
      <div className="spotlight-beam" style={{ animationDelay: '0s' }} />
      <div className="spotlight-beam" style={{ animationDelay: '2s' }} />
      <div className="spotlight-beam" style={{ animationDelay: '4s' }} />

      {/* Celebration particles */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 1],
            opacity: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * window.innerWidth],
            y: [0, -window.innerHeight],
          }}
          transition={{
            duration: 3,
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: '100%',
          }}
        >
          {i % 3 === 0 ? (
            <Star className="w-4 h-4 sm:w-6 sm:h-6 fill-[hsl(165,75%,50%)] text-[hsl(165,75%,50%)]" />
          ) : (
            <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-[hsl(175,85%,55%)]" />
          )}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl w-full">
        <div className="card-dramatic rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12">
          <div className="flex flex-col items-center gap-6 sm:gap-8 text-center">
            
            {/* Trophy */}
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
              {percentage >= 80 ? (
                <Crown className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" style={{ color: 'hsl(165, 75%, 50%)', filter: 'drop-shadow(0 0 20px hsl(165 75% 50%))' }} strokeWidth={2} />
              ) : (
                <Trophy className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40" style={{ color: 'hsl(165, 75%, 50%)', filter: 'drop-shadow(0 0 20px hsl(165 75% 50%))' }} strokeWidth={2} />
              )}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Sparkles className="w-10 h-10 sm:w-12 sm:h-12 absolute -top-4 -right-4" style={{ color: 'hsl(175, 85%, 55%)' }} />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-3 sm:mb-4 text-brand text-glow">
                مبروك!
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white" data-testid="text-completion-message" style={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' }}>
                {getMessage()}
              </p>
            </motion.div>

            {/* Stars */}
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ 
                    scale: i < stars ? 1 : 0.5, 
                    rotate: 0,
                    opacity: i < stars ? 1 : 0.3
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.5 + i * 0.15,
                  }}
                >
                  <Star 
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20" 
                    style={{ 
                      fill: i < stars ? 'hsl(165, 75%, 50%)' : 'transparent',
                      color: i < stars ? 'hsl(165, 75%, 50%)' : 'hsl(165, 60%, 25%)',
                      filter: i < stars ? 'drop-shadow(0 0 10px hsl(165 75% 50%))' : 'none'
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Score */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.7, type: "spring" }}
              className="w-full"
            >
              <div 
                className="rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10"
                style={{
                  background: 'rgba(20, 25, 45, 0.6)',
                  border: '3px solid hsl(45, 100%, 55%)',
                  boxShadow: '0 0 40px hsl(45 100% 55% / 0.3)',
                }}
              >
                <p className="text-2xl sm:text-3xl md:text-4xl font-black mb-2 text-brand">
                  النتيجة النهائية
                </p>
                <p className="text-5xl sm:text-6xl md:text-7xl font-black text-glow" style={{ color: 'hsl(165, 75%, 50%)' }} data-testid="text-final-score">
                  {score}/{totalQuestions}
                </p>
              </div>
            </motion.div>

            {/* Mascot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, type: "spring" }}
            >
              <Mascot
                size="large"
                animate={true}
                message="أنت الآن بطل الأمان! تذكر ما تعلمته!"
              />
            </motion.div>

            {/* Restart Button */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="w-full"
            >
              <Button
                onClick={onRestart}
                size="lg"
                className="btn-brand h-14 sm:h-16 md:h-20 px-8 sm:px-12 md:px-16 text-base sm:text-xl md:text-2xl font-black rounded-xl sm:rounded-2xl gap-2 sm:gap-3 md:gap-4 w-full sm:w-auto"
                data-testid="button-restart"
                style={{ direction: 'rtl' }}
              >
                <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                العب مرة أخرى
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
