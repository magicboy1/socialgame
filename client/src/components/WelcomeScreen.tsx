import { motion } from "framer-motion";
import { Shield, Play, Star, Sparkles } from "lucide-react";
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
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[hsl(var(--teal))] via-[hsl(156_45%_42%)] to-[hsl(156_50%_38%)]"
      data-testid="welcome-screen"
    >
      {/* Animated particles background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 60 + 20,
            height: Math.random() * 60 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: i % 3 === 0 
              ? 'hsl(var(--yellow))' 
              : i % 3 === 1 
              ? 'hsl(var(--orange-red))' 
              : 'rgba(255, 255, 255, 0.3)',
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            x: [0, Math.random() * 100 - 50],
            scale: [1, Math.random() + 0.5],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Glowing stars */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 1, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        >
          <Star className="w-6 h-6 fill-[hsl(var(--yellow))] text-[hsl(var(--yellow))]" />
        </motion.div>
      ))}

      <div className="relative z-10 h-screen flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden">
        {/* Title - Smaller */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 12,
            delay: 0.2,
          }}
          className="w-full max-w-4xl mb-4 md:mb-6"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-5 border-4 border-white/40 text-center">
            <h1 
              className="text-2xl md:text-3xl lg:text-4xl font-black text-[hsl(var(--yellow))] leading-tight mb-1"
              style={{ 
                textShadow: '3px 3px 0px hsl(var(--orange-red)), 2px 2px 0px hsl(var(--navy))',
                direction: 'rtl',
              }}
            >
              أبطال السوشال ميديا
            </h1>
            <h3 
              className="text-lg md:text-xl lg:text-2xl font-black text-white"
              style={{ 
                textShadow: '2px 2px 0px hsl(var(--navy))',
                direction: 'rtl',
              }}
            >
              🦸 كن بطلاً للأمان 🦸
            </h3>
          </div>
        </motion.div>

        {/* Main content: Mascot (right) + Features (left) */}
        <div className="w-full max-w-5xl flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12">
          {/* Left side - Features and Button */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center gap-3 md:gap-4 flex-1 order-2 md:order-1"
          >
            {/* Features */}
            <div className="space-y-2 md:space-y-3 w-full max-w-md">
              <div className="flex items-center gap-3 justify-start" dir="rtl">
                <div className="bg-[hsl(var(--yellow))] rounded-full p-2 md:p-2.5 flex-shrink-0 border-3 md:border-4 border-white">
                  <Shield className="w-6 h-6 md:w-7 md:h-7 text-[hsl(var(--navy))]" strokeWidth={3} />
                </div>
                <p className="text-lg md:text-xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)', direction: 'rtl' }}>
                  10 أسئلة تحدي مثيرة
                </p>
              </div>
              
              <div className="flex items-center gap-3 justify-start" dir="rtl">
                <div className="bg-[hsl(var(--yellow))] rounded-full p-2 md:p-2.5 flex-shrink-0 border-3 md:border-4 border-white">
                  <Star className="w-6 h-6 md:w-7 md:h-7 fill-[hsl(var(--navy))] text-[hsl(var(--navy))]" />
                </div>
                <p className="text-lg md:text-xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)', direction: 'rtl' }}>
                  نجوم ذهبية للفائزين
                </p>
              </div>
              
              <div className="flex items-center gap-3 justify-start" dir="rtl">
                <div className="bg-[hsl(var(--yellow))] rounded-full p-2 md:p-2.5 flex-shrink-0 border-3 md:border-4 border-white">
                  <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-[hsl(var(--navy))]" />
                </div>
                <p className="text-lg md:text-xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)', direction: 'rtl' }}>
                  تعلم وأنت تلعب
                </p>
              </div>
            </div>

            {/* Start button */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 10,
                delay: 0.6,
              }}
              className="w-full max-w-md mt-2 md:mt-4"
            >
              <Button
                onClick={onStart}
                size="lg"
                className="h-20 md:h-24 px-12 md:px-16 text-2xl md:text-3xl font-black rounded-xl md:rounded-2xl gap-3 md:gap-4 bg-[hsl(var(--yellow))] text-[hsl(var(--navy))] border-[8px] md:border-[10px] border-white hover:bg-white hover:scale-105 transition-all duration-300 w-full"
                data-testid="button-start-game"
                style={{ 
                  boxShadow: '0 8px 0px hsl(var(--orange-red)), 0 0 30px rgba(229, 242, 107, 0.5)',
                  textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)',
                  direction: 'rtl',
                }}
              >
                <Play className="w-10 h-10 md:w-12 md:h-12 fill-current" />
                ابدأ المغامرة!
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Hero mascot */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: 0.3,
            }}
            className="relative flex-shrink-0 order-1 md:order-2"
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
              <div className="relative scale-[1.8] md:scale-[2.2] lg:scale-[2.8]">
                {/* Glow effect behind mascot */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{
                    background: 'radial-gradient(circle, rgba(229, 242, 107, 0.4) 0%, transparent 70%)',
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
                <Mascot size="large" animate={true} />
              </div>
            </motion.div>

            {/* Fewer sparkles */}
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute"
                style={{
                  left: `${50 + Math.cos((i * Math.PI * 2) / 4) * 140}%`,
                  top: `${50 + Math.sin((i * Math.PI * 2) / 4) * 140}%`,
                }}
                animate={{
                  scale: [0, 1.2, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-8 h-8 text-[hsl(var(--yellow))]" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
