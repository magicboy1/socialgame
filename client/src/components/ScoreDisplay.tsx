import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface ScoreDisplayProps {
  score: number;
  animate?: boolean;
}

export function ScoreDisplay({ score, animate = false }: ScoreDisplayProps) {
  return (
    <motion.div
      className="flex items-center gap-2 bg-white rounded-full px-4 py-2 border-[4px]"
      style={{ 
        borderColor: 'hsl(var(--navy))',
        boxShadow: '0 4px 0px hsl(var(--yellow))'
      }}
      data-testid="score-display"
      animate={animate ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.4 }}
    >
      <Star className="w-6 h-6 fill-[hsl(var(--yellow))] text-[hsl(var(--yellow))]" />
      <span className="text-2xl font-extrabold" style={{ color: 'hsl(var(--navy))', textShadow: '1px 1px 0px rgba(0, 0, 0, 0.15)' }} data-testid="text-score">
        {score}
      </span>
    </motion.div>
  );
}
