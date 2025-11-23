import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Trophy, Star, Zap, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "./Mascot";
import { useGameSounds } from "@/contexts/GameSoundContext";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const { playStart } = useGameSounds();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      
      // Add/remove fullscreen class to body for CSS targeting
      if (isFs) {
        document.body.classList.add('is-fullscreen');
      } else {
        document.body.classList.remove('is-fullscreen');
      }
    };

    // Check if already in fullscreen on mount and apply class
    if (document.fullscreenElement) {
      setIsFullscreen(true);
      document.body.classList.add('is-fullscreen');
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      // Only remove class if not in fullscreen anymore
      if (!document.fullscreenElement) {
        document.body.classList.remove('is-fullscreen');
      }
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, hsl(230, 35%, 7%) 0%, hsl(260, 40%, 12%) 100%)' }}
      data-testid="welcome-screen"
    >
      {/* Animated spotlight beams */}
      <div className="spotlight-beam" style={{ animationDelay: '0s' }} />
      <div className="spotlight-beam" style={{ animationDelay: '3s' }} />
      <div className="spotlight-beam" style={{ animationDelay: '6s' }} />

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 2 === 0 ? 'hsl(45 100% 55%)' : 'hsl(195 100% 65%)',
            opacity: 0.4,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeOut",
          }}
        />
      ))}

      <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 2xl:p-12">
        <div className="w-[min(90vw,75rem)] flex flex-col gap-6 sm:gap-8 md:gap-12 lg:gap-16 2xl:gap-20">
          
          {/* Title */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2,
            }}
            className="text-center"
          >
            <div className="relative inline-block">
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(45, 200, 140, 0.4) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <h1 
                className="font-black leading-tight relative"
                style={{ 
                  fontSize: 'clamp(1.5rem, calc(3vw + 1rem), 6rem)',
                  marginBottom: 'clamp(0.5rem, 1vw, 2rem)',
                  color: 'hsl(165 75% 50%)',
                  textShadow: '0 0 30px hsl(165 75% 50% / 0.8), 0 0 60px hsl(165 75% 50% / 0.4), 4px 4px 0px hsl(165 85% 20%), 2px 2px 0px rgba(0, 0, 0, 0.8)',
                  direction: 'rtl',
                }}
              >
                أبطال السوشال ميديا
              </h1>
              <h3 
                className="font-black text-white relative"
                style={{ 
                  fontSize: 'clamp(0.875rem, calc(2vw + 0.5rem), 3.5rem)',
                  textShadow: '0 0 20px hsl(175 85% 55% / 0.6), 3px 3px 0px rgba(0, 0, 0, 0.8)',
                  direction: 'rtl',
                }}
              >
                🦸 من سيربح النجوم الخضراء؟ 🦸
              </h3>
            </div>
          </motion.div>

          {/* Mascot + Features */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-16 2xl:gap-20">
            
            {/* Mascot */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative order-1 md:order-2"
            >
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="relative scale-90 sm:scale-100 md:scale-110 lg:scale-125 xl:scale-150 2xl:scale-[1.75]">
                  {/* Glow effect behind mascot */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-2xl"
                    style={{
                      background: 'radial-gradient(circle, rgba(45, 200, 140, 0.3) 0%, transparent 70%)',
                    }}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <Mascot size="large" animate={true} />
                </div>
              </motion.div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col order-2 md:order-1"
              style={{
                gap: 'clamp(0.75rem, 1vw, 2rem)',
              }}
              dir="rtl"
            >
              <div 
                className="flex items-center"
                style={{
                  gap: 'clamp(0.75rem, 1vw, 2rem)',
                }}
              >
                <div 
                  className="rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 'clamp(3rem, 4vw, 5rem)',
                    height: 'clamp(3rem, 4vw, 5rem)',
                    background: 'linear-gradient(135deg, hsl(165 75% 50%), hsl(165 80% 40%))',
                    boxShadow: '0 0 20px rgba(45, 200, 140, 0.5)',
                  }}
                >
                  <Trophy 
                    className="text-[hsl(230,35%,7%)]" 
                    strokeWidth={3}
                    style={{
                      width: 'clamp(1.5rem, 2vw, 2.5rem)',
                      height: 'clamp(1.5rem, 2vw, 2.5rem)',
                    }}
                  />
                </div>
                <p 
                  className="font-bold text-white" 
                  style={{ 
                    fontSize: 'clamp(1rem, calc(1.5vw + 0.5rem), 2.5rem)',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' 
                  }}
                >
                  10 أسئلة تحدي
                </p>
              </div>
              
              <div 
                className="flex items-center"
                style={{
                  gap: 'clamp(0.75rem, 1vw, 2rem)',
                }}
              >
                <div 
                  className="rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 'clamp(3rem, 4vw, 5rem)',
                    height: 'clamp(3rem, 4vw, 5rem)',
                    background: 'linear-gradient(135deg, hsl(165 75% 50%), hsl(165 80% 40%))',
                    boxShadow: '0 0 20px rgba(45, 200, 140, 0.5)',
                  }}
                >
                  <Star 
                    className="fill-[hsl(230,35%,7%)] text-[hsl(230,35%,7%)]"
                    style={{
                      width: 'clamp(1.5rem, 2vw, 2.5rem)',
                      height: 'clamp(1.5rem, 2vw, 2.5rem)',
                    }}
                  />
                </div>
                <p 
                  className="font-bold text-white" 
                  style={{ 
                    fontSize: 'clamp(1rem, calc(1.5vw + 0.5rem), 2.5rem)',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' 
                  }}
                >
                  نجوم خضراء
                </p>
              </div>
              
              <div 
                className="flex items-center"
                style={{
                  gap: 'clamp(0.75rem, 1vw, 2rem)',
                }}
              >
                <div 
                  className="rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    width: 'clamp(3rem, 4vw, 5rem)',
                    height: 'clamp(3rem, 4vw, 5rem)',
                    background: 'linear-gradient(135deg, hsl(165 75% 50%), hsl(165 80% 40%))',
                    boxShadow: '0 0 20px rgba(45, 200, 140, 0.5)',
                  }}
                >
                  <Zap 
                    className="fill-[hsl(230,35%,7%)] text-[hsl(230,35%,7%)]"
                    style={{
                      width: 'clamp(1.5rem, 2vw, 2.5rem)',
                      height: 'clamp(1.5rem, 2vw, 2.5rem)',
                    }}
                  />
                </div>
                <p 
                  className="font-bold text-white" 
                  style={{ 
                    fontSize: 'clamp(1rem, calc(1.5vw + 0.5rem), 2.5rem)',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' 
                  }}
                >
                  إثارة ومتعة
                </p>
              </div>
            </motion.div>
          </div>

          {/* Start button */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 12,
              delay: 0.7,
            }}
            className="flex justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Button
                onClick={() => {
                  playStart();
                  onStart();
                }}
                size="lg"
                className="btn-brand font-black rounded-xl sm:rounded-2xl hover:scale-110 transition-all duration-300"
                data-testid="button-start-game"
                style={{ 
                  direction: 'rtl',
                  height: 'clamp(3.5rem, 5vw, 6rem)',
                  padding: '0 clamp(2rem, 4vw, 5rem)',
                  fontSize: 'clamp(1rem, calc(1.5vw + 0.5rem), 2.5rem)',
                  gap: 'clamp(0.5rem, 1vw, 1.5rem)',
                }}
              >
                <Play 
                  className="fill-current"
                  style={{
                    width: 'clamp(1.5rem, 2.5vw, 3rem)',
                    height: 'clamp(1.5rem, 2.5vw, 3rem)',
                  }}
                />
                <span>ابدأ اللعبة!</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Button - Bottom Left */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9 }}
        className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-50"
      >
        <Button
          onClick={toggleFullscreen}
          size="icon"
          variant="ghost"
          className="hover-elevate active-elevate-2 h-10 w-10 sm:h-11 sm:w-11 rounded-lg"
          style={{
            background: 'rgba(20, 25, 45, 0.7)',
            border: '2px solid hsl(165, 75%, 50%)',
            color: 'hsl(165, 75%, 50%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 15px hsl(165 75% 50% / 0.3)',
          }}
          data-testid="button-fullscreen-welcome"
        >
          {isFullscreen ? (
            <Minimize className="w-5 h-5 sm:w-5 sm:h-5" />
          ) : (
            <Maximize className="w-5 h-5 sm:w-5 sm:h-5" />
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
