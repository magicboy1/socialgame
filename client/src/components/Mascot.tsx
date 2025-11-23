import { motion } from "framer-motion";
import mascotImage from "@assets/image_1763726334471.png";

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
        alt="Little Siter - بطل الأمان"
        className={`${sizeClasses[size]} object-contain drop-shadow-2xl`}
        data-testid="mascot-avatar"
      />
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute -right-4 -top-4 rounded-2xl shadow-2xl px-4 sm:px-5 py-3 sm:py-4 border-3 max-w-xs"
          style={{
            background: 'linear-gradient(135deg, hsl(165 75% 50%), hsl(165 80% 40%))',
            borderColor: 'hsl(165 70% 65%)',
            boxShadow: '0 0 30px hsl(165 75% 50% / 0.6), 0 8px 0px hsl(165 85% 30%)',
          }}
          data-testid="mascot-speech-bubble"
        >
          <div 
            className="absolute -bottom-2 left-8 w-4 h-4 border-r-3 border-b-3 transform rotate-45" 
            style={{
              background: 'hsl(165 80% 40%)',
              borderColor: 'hsl(165 70% 65%)',
            }}
          />
          <p 
            className="text-sm sm:text-base md:text-lg font-black relative z-10" 
            style={{ 
              color: 'hsl(230 35% 7%)',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
              direction: 'rtl',
            }}
          >
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
