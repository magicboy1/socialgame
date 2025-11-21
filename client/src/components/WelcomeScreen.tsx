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
      {/* Animated particles background - more consistent */}
      {Array.from({ length: 15 }).map((_, i) => {
        const size = i % 3 === 0 ? 40 : i % 3 === 1 ? 50 : 35;
        const xPos = (i * 7) % 100;
        const yPos = (i * 13) % 100;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${xPos}%`,
              top: `${yPos}%`,
              background: i % 3 === 0 
                ? 'hsl(var(--yellow))' 
                : i % 3 === 1 
                ? 'hsl(var(--orange-red))' 
                : 'rgba(255, 255, 255, 0.25)',
              opacity: 0.15,
            }}
            animate={{
              y: [0, -80],
              x: [0, i % 2 === 0 ? 30 : -30],
              scale: [1, 1.3, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        );
      })}

      {/* Glowing stars - more balanced */}
      {Array.from({ length: 6 }).map((_, i) => {
        const xPos = (i * 17) % 100;
        const yPos = (i * 19) % 100;
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute"
            style={{
              left: `${xPos}%`,
              top: `${yPos}%`,
            }}
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.7, 0.4],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          >
            <Star className="w-5 h-5 fill-[hsl(var(--yellow))] text-[hsl(var(--yellow))]" />
          </motion.div>
        );
      })}

      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-between p-4 md:p-8 gap-8 md:gap-16 lg:gap-20">
        {/* Right side - All content */}
        <div className="flex flex-col items-center md:items-end gap-6 md:gap-8 lg:gap-10 flex-1 max-w-xl order-2 md:order-1">
          {/* Epic title with new design - smaller box */}
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
            <div className="bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 border-4 border-white/40">
              <motion.h1 
                className="text-3xl md:text-4xl lg:text-5xl font-black text-[hsl(var(--yellow))] leading-tight mb-1"
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
                className="text-2xl md:text-3xl lg:text-4xl font-black text-white leading-tight"
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
              className="text-2xl md:text-3xl font-black text-white"
              style={{ 
                textShadow: '2px 2px 0px hsl(var(--navy))',
                direction: 'rtl',
              }}
            >
              🦸 كن بطلاً للأمان 🦸
            </h3>
          </motion.div>
          
          {/* Features - More spacing, unified icons */}
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 md:space-y-5 w-full"
          >
            <div className="flex items-center gap-4 text-right" dir="rtl">
              <div className="bg-[hsl(var(--yellow))] rounded-full p-3 flex-shrink-0 border-4 border-white">
                <Shield className="w-7 h-7 text-[hsl(var(--navy))]" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)', direction: 'rtl' }}>
                  10 أسئلة تحدي مثيرة
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-right" dir="rtl">
              <div className="bg-[hsl(var(--yellow))] rounded-full p-3 flex-shrink-0 border-4 border-white">
                <Star className="w-7 h-7 fill-[hsl(var(--navy))] text-[hsl(var(--navy))]" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)', direction: 'rtl' }}>
                  نجوم ذهبية للفائزين
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-right" dir="rtl">
              <div className="bg-[hsl(var(--yellow))] rounded-full p-3 flex-shrink-0 border-4 border-white">
                <Sparkles className="w-7 h-7 text-[hsl(var(--navy))]" strokeWidth={2.5} />
              </div>
              <div>
                <p className="text-xl md:text-2xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.4)', direction: 'rtl' }}>
                  تعلم وأنت تلعب
                </p>
              </div>
            </div>
          </motion.div>

          {/* Epic start button - improved CTA */}
          <motion.div
            initial={{ scale: 0, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 10,
              delay: 0.8,
            }}
            className="w-full mt-4 md:mt-6"
          >
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  '0 6px 0px hsl(var(--orange-red)), 0 0 20px rgba(229, 242, 107, 0.4)',
                  '0 6px 0px hsl(var(--orange-red)), 0 0 40px rgba(229, 242, 107, 0.8)',
                  '0 6px 0px hsl(var(--orange-red)), 0 0 20px rgba(229, 242, 107, 0.4)',
                ],
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
                className="h-20 md:h-22 px-10 md:px-14 text-2xl md:text-3xl font-black rounded-2xl gap-3 bg-[hsl(var(--yellow))] text-[hsl(var(--navy))] border-[10px] border-white hover:bg-white hover:scale-110 transition-all duration-300 w-full md:w-auto"
                data-testid="button-start-game"
                style={{ 
                  boxShadow: '0 6px 0px hsl(var(--orange-red)), 0 0 20px rgba(229, 242, 107, 0.4)',
                  textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)',
                  direction: 'rtl',
                }}
              >
                <Play className="w-10 h-10 fill-current" />
                ابدأ المغامرة!
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero mascot - Far left, with shadow */}
        <motion.div
          initial={{ x: -300, opacity: 0, rotate: -180 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 12,
            delay: 0.3,
          }}
          className="relative flex-shrink-0 order-1 md:order-2 md:-ml-8 lg:-ml-16"
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
            <div className="relative scale-[1.5] md:scale-[2.2] lg:scale-[2.8]">
              {/* Glow effect behind mascot */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background: 'radial-gradient(circle, rgba(229, 242, 107, 0.5) 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Shadow underneath mascot */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[20px] rounded-full blur-xl"
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  transform: 'translateX(-50%) translateY(50%) scaleY(0.3)',
                }}
              />
              
              <Mascot size="large" animate={true} />
            </div>
          </motion.div>

          {/* Sparkles around mascot - more consistent */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                left: `${50 + Math.cos((i * Math.PI * 2) / 6) * 150}%`,
                top: `${50 + Math.sin((i * Math.PI * 2) / 6) * 150}%`,
              }}
              animate={{
                scale: [0, 1.2, 0],
                rotate: [0, 180, 360],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-9 h-9 text-[hsl(var(--yellow))]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
