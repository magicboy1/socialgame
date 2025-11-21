import { useDroppable } from "@dnd-kit/core";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DropZoneProps {
  id: string;
  label: string;
  value: boolean;
  isOver: boolean;
}

export function DropZone({ id, label, value, isOver }: DropZoneProps) {
  const { setNodeRef } = useDroppable({ id });
  const isSafe = value === true;

  return (
    <div ref={setNodeRef} className="w-full">
      <motion.div
        animate={{
          scale: isOver ? 1.05 : 1,
          y: isOver ? -5 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="w-full"
        data-testid={`drop-zone-${value ? "safe" : "unsafe"}`}
      >
        <div
          className={`
            w-full py-6 sm:py-8 px-6 sm:px-8 md:px-12 rounded-[3rem] transition-all duration-300 relative overflow-hidden
            ${
              isSafe
                ? isOver
                  ? "bg-[#28A745] shadow-[0_10px_30px_rgba(40,167,69,0.5)]"
                  : "bg-[#2D8B7E] shadow-[0_8px_20px_rgba(45,139,126,0.4)] hover:shadow-[0_12px_25px_rgba(45,139,126,0.5)]"
                : isOver
                ? "bg-[#DC3545] shadow-[0_10px_30px_rgba(232,93,93,0.5)]"
                : "bg-[#E85D5D] shadow-[0_8px_20px_rgba(232,93,93,0.4)] hover:shadow-[0_12px_25px_rgba(232,93,93,0.5)]"
            }
          `}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <motion.div
              animate={{
                scale: isOver ? [1, 1.15, 1] : 1,
              }}
              transition={{ duration: 0.4, repeat: isOver ? Infinity : 0 }}
            >
              {isSafe ? (
                <Check
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white"
                  strokeWidth={4}
                />
              ) : (
                <X
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white"
                  strokeWidth={4}
                />
              )}
            </motion.div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              {label}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
