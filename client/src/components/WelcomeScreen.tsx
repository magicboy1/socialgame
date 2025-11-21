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

      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-6 md:gap-12 lg:gap-16">
        {/* Right side - All content */}
        <div className="flex flex-col items-center md:items-end gap-4 md:gap-6 flex-1 max-w-2xl order-2 md:order-1">
          {/* Epic title with new design */}
          <motion.div
            initial={{ y: -100, opacity: 0, scale: 0.8 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 12,
              delay: 0.2,
            }}
            className="text-center md:text-right"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 border-4 border-white/40">
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-[hsl(var(--yellow))] leading-tight mb-1 md:mb-2"
                style={{ 
                  textShadow: '3px 3px 0px hsl(var(--orange-red)), 2px 2px 0px hsl(var(--navy))',
                  direction: 'rtl',
                }}
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                أبطال
              </motion.h1>
              <motion.h2 
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black text-white leading-tight"
                style={{ 
                  textShadow: '2px 2px 0px hsl(var(--navy))',
                  direction: 'rtl',
                }}
              >
                السوشال ميديا
              </motion.h2>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center md:text-right"
          >
            <h3 
              className="text-xl md:text-2xl lg:text-3xl font-black text-white"
              style={{ 
                textShadow: '2px 2px 0px hsl(var(--navy))',
                direction: 'rtl',
              }}
            >
              🦸 كن بطلاً للأمان 🦸
            </h3>
          </motion.div>
          
          {/* Features - New design */}
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-2 md:space-y-3 w-full"
          >
            <div className="flex items-start gap-3 text-right" dir="rtl">
              <div className="bg-[hsl(var(--yellow))] rounded-full p-2 md:p-3 flex-shrink-0 border-3 md:border-4 border-white">
                <Shield className="w-6 h-6 md:w-7 md:h-7 text-[hsl(var(--navy))]" strokeWidth={3} />
              </div>
              <div>
                <p className="text-lg md:text-xl lg:text-2xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)', direction: 'rtl' }}>
                  10 أسئلة تحدي مثيرة
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-right" dir="rtl">
              <div className="bg-[hsl(var(--yellow))] rounded-full p-2 md:p-3 flex-shrink-0 border-3 md:border-4 border-white">
                <Star className="w-6 h-6 md:w-7 md:h-7 fill-[hsl(var(--navy))] text-[hsl(var(--navy))]" />
              </div>
              <div>
                <p className="text-lg md:text-xl lg:text-2xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)', direction: 'rtl' }}>
                  نجوم ذهبية للفائزين
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 text-right" dir="rtl">
              <div className="bg-[hsl(var(--yellow))] rounded-full p-2 md:p-3 flex-shrink-0 border-3 md:border-4 border-white">
                <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-[hsl(var(--navy))]" />
              </div>
              <div>
                <p className="text-lg md:text-xl lg:text-2xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)', direction: 'rtl' }}>
                  تعلم وأنت تلعب
                </p>
              </div>
            </div>
          </motion.div>

          {/* Epic start button with pulsing effect */}
          <motion.div
            initial={{ scale: 0, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 10,
              delay: 0.8,
            }}
            className="w-full mt-2 md:mt-4"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Button
                onClick={onStart}
                size="lg"
                className="h-20 md:h-24 px-12 md:px-16 text-2xl md:text-3xl lg:text-4xl font-black rounded-xl md:rounded-2xl gap-3 md:gap-4 bg-[hsl(var(--yellow))] text-[hsl(var(--navy))] border-[8px] md:border-[10px] border-white hover:bg-white hover:scale-110 transition-all duration-300 w-full md:w-auto"
                data-testid="button-start-game"
                style={{ 
                  boxShadow: '0 8px 0px hsl(var(--orange-red)), 0 0 30px rgba(229, 242, 107, 0.6)',
                  textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)',
                  direction: 'rtl',
                }}
              >
                <Play className="w-10 h-10 md:w-12 md:h-12 fill-current" />
                ابدأ المغامرة!
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero mascot - Left side */}
        <motion.div
          initial={{ x: -300, opacity: 0, rotate: -180 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 12,
            delay: 0.3,
          }}
          className="relative flex-shrink-0 order-1 md:order-2"
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative scale-[1.5] md:scale-[2] lg:scale-[2.5]">
              {/* Glow effect behind mascot */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(229, 242, 107, 0.6) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0.9, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Mascot size="large" animate={true} />
            </div>
          </motion.div>

          {/* Sparkles around mascot */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 160}%`,
                top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 160}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-10 h-10 text-[hsl(var(--yellow))]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
