import { motion } from "framer-motion";
import { Play, Trophy, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mascot } from "./Mascot";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
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

      <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-4xl flex flex-col gap-6 sm:gap-8 md:gap-12">
          
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
                  background: 'radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
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
                className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-gold leading-tight mb-2 sm:mb-3 md:mb-4 relative"
                style={{ 
                  textShadow: '0 0 30px hsl(45 100% 55% / 0.8), 0 0 60px hsl(45 100% 55% / 0.4), 4px 4px 0px hsl(30 45% 25%), 2px 2px 0px rgba(0, 0, 0, 0.8)',
                  direction: 'rtl',
                }}
              >
                أبطال السوشال ميديا
              </h1>
              <h3 
                className="text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-black text-white relative"
                style={{ 
                  textShadow: '0 0 20px hsl(195 100% 65% / 0.6), 3px 3px 0px rgba(0, 0, 0, 0.8)',
                  direction: 'rtl',
                }}
              >
                🦸 من سيربح النجوم الذهبية؟ 🦸
              </h3>
            </div>
          </motion.div>

          {/* Mascot + Features */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            
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
                <div className="relative scale-90 sm:scale-100 md:scale-125 lg:scale-150">
                  {/* Glow effect behind mascot */}
                  <motion.div
                    className="absolute inset-0 rounded-full blur-2xl"
                    style={{
                      background: 'radial-gradient(circle, rgba(212, 175, 55, 0.3) 0%, transparent 70%)',
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
              className="flex flex-col gap-3 sm:gap-4 order-2 md:order-1"
              dir="rtl"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, hsl(45 100% 55%), hsl(40 90% 48%))',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                  }}
                >
                  <Trophy className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[hsl(230,35%,7%)]" strokeWidth={3} />
                </div>
                <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                  10 أسئلة تحدي
                </p>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, hsl(45 100% 55%), hsl(40 90% 48%))',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                  }}
                >
                  <Star className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-[hsl(230,35%,7%)] text-[hsl(230,35%,7%)]" />
                </div>
                <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
                  نجوم ذهبية
                </p>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-4">
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, hsl(45 100% 55%), hsl(40 90% 48%))',
                    boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                  }}
                >
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 fill-[hsl(230,35%,7%)] text-[hsl(230,35%,7%)]" />
                </div>
                <p className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)' }}>
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
                onClick={onStart}
                size="lg"
                className="btn-gold h-14 sm:h-16 md:h-20 lg:h-24 px-8 sm:px-12 md:px-16 lg:px-20 text-base sm:text-xl md:text-2xl lg:text-3xl font-black rounded-xl sm:rounded-2xl gap-2 sm:gap-3 md:gap-4 hover:scale-110 transition-all duration-300"
                data-testid="button-start-game"
                style={{ 
                  direction: 'rtl',
                }}
              >
                <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 fill-current" />
                <span>ابدأ اللعبة!</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
