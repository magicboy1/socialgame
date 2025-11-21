import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface ScoreDisplayProps {
  score: number;
  animate?: boolean;
}

export function ScoreDisplay({ score, animate = false }: ScoreDisplayProps) {
  return (
    <motion.div
      className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md border-2 border-primary/20"
      data-testid="score-display"
      animate={animate ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.4 }}
    >
      <Star className="w-6 h-6 fill-chart-3 text-chart-3" />
      <span className="text-2xl font-bold text-foreground" data-testid="text-score">
        {score}
      </span>
    </motion.div>
  );
}
