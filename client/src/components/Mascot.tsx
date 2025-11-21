import { motion } from "framer-motion";
import mascotImage from "@assets/image_1763724898056.png";

interface MascotProps {
  size?: "small" | "medium" | "large";
  animate?: boolean;
  message?: string;
}

export function Mascot({ size = "medium", animate = true, message }: MascotProps) {
  const sizeClasses = {
    small: "w-20 h-20",
    medium: "w-32 h-32",
    large: "w-40 h-40",
  };

  const MascotContent = () => (
    <div className="relative" data-testid="mascot-container">
      <img
        src={mascotImage}
        alt="Safety Superhero Mascot"
        className={`${sizeClasses[size]} object-contain drop-shadow-lg`}
        data-testid="mascot-avatar"
      />
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute -right-4 -top-4 bg-white rounded-2xl shadow-xl px-4 py-3 border-2 border-primary/30 max-w-xs"
          data-testid="mascot-speech-bubble"
        >
          <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-r-2 border-b-2 border-primary/30 transform rotate-45" />
          <p className="text-sm font-semibold text-foreground relative z-10">
            {message}
          </p>
        </motion.div>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}
      >
        <MascotContent />
      </motion.div>
    );
  }

  return <MascotContent />;
}
