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

      <div className="relative z-10 min-h-screen flex flex-col md:flex-row items-center justify-center p-6 gap-8 md:gap-12">
        {/* Hero mascot - Left side, bigger */}
        <motion.div
          initial={{ x: -200, opacity: 0, rotate: -180 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 12,
            delay: 0.3,
          }}
          className="relative flex-shrink-0"
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
            <div className="relative scale-150 md:scale-[2]">
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
              <Mascot size="large" animate={true} />
            </div>
          </motion.div>

          {/* Sparkles around mascot */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              style={{
                left: `${50 + Math.cos((i * Math.PI * 2) / 8) * 150}%`,
                top: `${50 + Math.sin((i * Math.PI * 2) / 8) * 150}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-10 h-10 text-[hsl(var(--yellow))]" />
            </motion.div>
          ))}
        </motion.div>

        {/* Right side - All content */}
        <div className="flex flex-col items-center md:items-start gap-6 md:gap-8 flex-1 max-w-2xl">
          {/* Epic title with glow effect */}
          <motion.div
            initial={{ x: 200, opacity: 0, scale: 0.5 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
              delay: 0.2,
            }}
            className="text-center md:text-right space-y-3"
          >
            <motion.div
              animate={{
                textShadow: [
                  '0 0 20px rgba(229, 242, 107, 0.8), 0 0 40px rgba(229, 242, 107, 0.5)',
                  '0 0 30px rgba(229, 242, 107, 1), 0 0 60px rgba(229, 242, 107, 0.7)',
                  '0 0 20px rgba(229, 242, 107, 0.8), 0 0 40px rgba(229, 242, 107, 0.5)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
                style={{ 
                  textShadow: '4px 4px 0px hsl(var(--navy)), 0 0 30px rgba(229, 242, 107, 0.6)',
                  WebkitTextStroke: '2px hsl(var(--navy))',
                  letterSpacing: '0',
                  wordSpacing: '0',
                }}
              >
                أبطال السوشال ميديا
              </h1>
            </motion.div>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center md:text-right"
          >
            <h3 
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-4"
              style={{ 
                textShadow: '3px 3px 0px hsl(var(--navy))',
                letterSpacing: '0',
                wordSpacing: '0',
              }}
            >
              كن بطلاً للأمان! 🦸
            </h3>
          </motion.div>
          
          {/* Features */}
          <motion.div
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col gap-3 w-full"
          >
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border-4 border-white">
              <Shield className="w-7 h-7 text-[hsl(var(--yellow))]" strokeWidth={3} />
              <span className="text-xl md:text-2xl font-extrabold text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)', letterSpacing: '0', wordSpacing: '0' }}>
                10 أسئلة تحدي
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border-4 border-white">
              <Star className="w-7 h-7 fill-[hsl(var(--yellow))] text-[hsl(var(--yellow))]" />
              <span className="text-xl md:text-2xl font-extrabold text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)', letterSpacing: '0', wordSpacing: '0' }}>
                اجمع نجوم ذهبية
              </span>
            </div>
            <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border-4 border-white">
              <Sparkles className="w-7 h-7 text-[hsl(var(--yellow))]" />
              <span className="text-xl md:text-2xl font-extrabold text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)', letterSpacing: '0', wordSpacing: '0' }}>
                تعلم وامرح معنا
              </span>
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
              delay: 0.9,
            }}
            className="w-full"
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
                className="h-24 px-16 text-3xl md:text-4xl font-extrabold rounded-2xl gap-4 bg-[hsl(var(--yellow))] text-[hsl(var(--navy))] border-[10px] border-white hover:bg-white hover:scale-110 transition-all duration-300 w-full md:w-auto"
                data-testid="button-start-game"
                style={{ 
                  boxShadow: '0 10px 0px hsl(var(--orange-red)), 0 0 40px rgba(229, 242, 107, 0.6)',
                  textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)',
                  letterSpacing: '0',
                  wordSpacing: '0',
                }}
              >
                <Play className="w-12 h-12 fill-current" />
                ابدأ المغامرة!
              </Button>
            </motion.div>
          </motion.div>

          {/* Press Start animation */}
          <motion.p
            className="text-lg md:text-xl font-bold text-white/80"
            style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)', letterSpacing: '0', wordSpacing: '0' }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            اضغط للبدء ↑
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
