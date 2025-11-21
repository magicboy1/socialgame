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
      dir="rtl"
    >
      {/* Simplified background particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 40,
            height: 40,
            left: `${(i * 12.5)}%`,
            top: `${((i * 7) % 100)}%`,
            background: i % 2 === 0 ? 'rgba(229, 242, 107, 0.1)' : 'rgba(244, 106, 78, 0.1)',
          }}
          animate={{
            y: [0, -60, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Main content grid */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 p-6 md:p-10 lg:p-16 items-center">
        
        {/* Content column - 60% (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-8 order-2 lg:order-1">
          
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2"
              style={{ textShadow: '3px 3px 0px hsl(var(--navy))' }}
            >
              أبطال السوشال ميديا
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 
              className="text-2xl md:text-3xl font-black text-[hsl(var(--yellow))]"
              style={{ textShadow: '2px 2px 0px hsl(var(--orange-red))' }}
            >
              كن بطلاً للأمان
            </h2>
          </motion.div>

          {/* Features list */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-4">
              <div className="bg-[hsl(var(--yellow))] rounded-full p-3 border-4 border-white flex-shrink-0">
                <Shield className="w-8 h-8 text-[hsl(var(--navy))]" strokeWidth={2} />
              </div>
              <p className="text-xl md:text-2xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)' }}>
                10 أسئلة تحدي مثيرة
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[hsl(var(--yellow))] rounded-full p-3 border-4 border-white flex-shrink-0">
                <Star className="w-8 h-8 fill-[hsl(var(--navy))] text-[hsl(var(--navy))]" strokeWidth={2} />
              </div>
              <p className="text-xl md:text-2xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)' }}>
                نجوم ذهبية للفائزين
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-[hsl(var(--yellow))] rounded-full p-3 border-4 border-white flex-shrink-0">
                <Sparkles className="w-8 h-8 text-[hsl(var(--navy))]" strokeWidth={2} />
              </div>
              <p className="text-xl md:text-2xl font-black text-white" style={{ textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)' }}>
                تعلم وأنت تلعب
              </p>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-4"
          >
            <Button
              onClick={onStart}
              size="lg"
              className="text-2xl md:text-3xl font-black bg-[hsl(var(--yellow))] text-[hsl(var(--navy))] border-8 border-white hover:bg-white"
              data-testid="button-start-game"
              style={{ 
                boxShadow: '0 6px 0px hsl(var(--orange-red))',
                textShadow: '2px 2px 0px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Play className="w-8 h-8 mr-2 fill-current" />
              ابدأ المغامرة
            </Button>
          </motion.div>
        </div>

        {/* Mascot column - 40% (2 cols) */}
        <div className="lg:col-span-2 flex items-center justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            {/* Floating animation */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Glow effect */}
              <div 
                className="absolute inset-0 -z-10 rounded-full blur-2xl"
                style={{
                  background: 'radial-gradient(circle, rgba(229, 242, 107, 0.3) 0%, transparent 60%)',
                }}
              />
              
              {/* Ground shadow */}
              <div 
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-6 -z-20 rounded-full blur-lg"
                style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                }}
              />
              
              <div className="scale-150 md:scale-[2] lg:scale-[2.5]">
                <Mascot size="large" animate={true} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
