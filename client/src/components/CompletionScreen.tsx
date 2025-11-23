import { useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, RotateCcw, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "./Mascot";
import { useGameSounds } from "@/contexts/GameSoundContext";

interface CompletionScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export function CompletionScreen({ score, totalQuestions, onRestart }: CompletionScreenProps) {
  const { playVictory } = useGameSounds();
  const percentage = (score / totalQuestions) * 100;
  const stars = percentage >= 80 ? 3 : percentage >= 60 ? 2 : 1;

  useEffect(() => {
    playVictory();
  }, [playVictory]);

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

      <div className="relative z-10 w-[min(90vw,75rem)]">
        <div className="card-dramatic rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 2xl:p-16">
          <div className="flex flex-col items-center text-center" style={{ gap: 'clamp(1.5rem, 2vw, 3rem)' }}>
            
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
                <Crown 
                  style={{ 
                    color: 'hsl(165, 75%, 50%)', 
                    filter: 'drop-shadow(0 0 20px hsl(165 75% 50%))',
                    width: 'clamp(6rem, 10vw, 12rem)',
                    height: 'clamp(6rem, 10vw, 12rem)',
                  }} 
                  strokeWidth={2} 
                />
              ) : (
                <Trophy 
                  style={{ 
                    color: 'hsl(165, 75%, 50%)', 
                    filter: 'drop-shadow(0 0 20px hsl(165 75% 50%))',
                    width: 'clamp(6rem, 10vw, 12rem)',
                    height: 'clamp(6rem, 10vw, 12rem)',
                  }} 
                  strokeWidth={2} 
                />
              )}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <Sparkles 
                  className="absolute -top-4 -right-4" 
                  style={{ 
                    color: 'hsl(175, 85%, 55%)',
                    width: 'clamp(2.5rem, 3vw, 4rem)',
                    height: 'clamp(2.5rem, 3vw, 4rem)',
                  }} 
                />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h1 
                className="font-black text-brand text-glow"
                style={{
                  fontSize: 'clamp(2.5rem, calc(4vw + 1rem), 6rem)',
                  marginBottom: 'clamp(0.75rem, 1vw, 1.5rem)',
                }}
              >
                مبروك!
              </h1>
              <p 
                className="font-bold text-white" 
                data-testid="text-completion-message" 
                style={{ 
                  fontSize: 'clamp(1.125rem, calc(2vw + 0.5rem), 2.5rem)',
                  textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)' 
                }}
              >
                {getMessage()}
              </p>
            </motion.div>

            {/* Stars */}
            <div className="flex" style={{ gap: 'clamp(0.5rem, 1vw, 1.5rem)' }}>
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
                    style={{ 
                      width: 'clamp(3.5rem, 5vw, 6rem)',
                      height: 'clamp(3.5rem, 5vw, 6rem)',
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
                className="rounded-xl sm:rounded-2xl"
                style={{
                  padding: 'clamp(1.5rem, 2.5vw, 3rem)',
                  background: 'rgba(20, 25, 45, 0.6)',
                  border: '3px solid hsl(45, 100%, 55%)',
                  boxShadow: '0 0 40px hsl(45 100% 55% / 0.3)',
                }}
              >
                <p 
                  className="font-black text-brand"
                  style={{
                    fontSize: 'clamp(1.5rem, calc(2.5vw + 0.5rem), 3rem)',
                    marginBottom: 'clamp(0.5rem, 0.5vw, 1rem)',
                  }}
                >
                  النتيجة النهائية
                </p>
                <p 
                  className="font-black text-glow" 
                  style={{ 
                    color: 'hsl(165, 75%, 50%)',
                    fontSize: 'clamp(3rem, calc(5vw + 1rem), 6rem)',
                  }} 
                  data-testid="text-final-score"
                >
                  {score}/{totalQuestions}
                </p>
              </div>
            </motion.div>

            {/* Mascot */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, type: "spring" }}
              className="flex flex-col items-center"
              style={{ gap: 'clamp(1rem, 1.5vw, 2rem)' }}
            >
              <Mascot
                size="large"
                animate={true}
              />
              <p 
                className="font-black text-brand px-4 text-center"
                style={{ 
                  fontSize: 'clamp(1.125rem, calc(1.5vw + 0.5rem), 2rem)',
                  textShadow: '0 0 15px hsl(165 75% 50% / 0.5), 2px 2px 4px rgba(0, 0, 0, 0.8)',
                  direction: 'rtl'
                }}
              >
                أنت الآن بطل الأمان! تذكر ما تعلمته!
              </p>
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
                className="btn-brand font-black rounded-xl sm:rounded-2xl w-full sm:w-auto"
                data-testid="button-restart"
                style={{ 
                  direction: 'rtl',
                  height: 'clamp(3.5rem, 5vw, 5rem)',
                  padding: '0 clamp(2rem, 4vw, 4rem)',
                  fontSize: 'clamp(1rem, calc(1.5vw + 0.5rem), 2rem)',
                  gap: 'clamp(0.5rem, 1vw, 1.5rem)',
                }}
              >
                <RotateCcw 
                  style={{
                    width: 'clamp(1.25rem, 1.75vw, 2rem)',
                    height: 'clamp(1.25rem, 1.75vw, 2rem)',
                  }}
                />
                العب مرة أخرى
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
