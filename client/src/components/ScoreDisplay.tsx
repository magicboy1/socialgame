import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface ScoreDisplayProps {
  score: number;
  animate?: boolean;
}

export function ScoreDisplay({ score, animate = false }: ScoreDisplayProps) {
  return (
    <motion.div
      className="flex items-center gap-2 sm:gap-3 rounded-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 sm:border-3"
      style={{ 
        background: 'linear-gradient(135deg, hsl(165 75% 50%), hsl(165 80% 40%))',
        borderColor: 'hsl(165 70% 65%)',
        boxShadow: '0 0 20px hsl(165 75% 50% / 0.5), 0 4px 0px hsl(165 85% 30%)'
      }}
      data-testid="score-display"
      animate={animate ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.4 }}
    >
      <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-white text-white drop-shadow-md" />
      <span 
        className="text-xl sm:text-2xl font-black" 
        style={{ 
          color: 'hsl(230 35% 7%)', 
          textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'
        }} 
        data-testid="text-score"
      >
        {score}
      </span>
    </motion.div>
  );
}
