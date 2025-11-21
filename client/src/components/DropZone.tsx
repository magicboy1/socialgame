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
            w-full py-6 sm:py-8 px-6 sm:px-8 md:px-12 rounded-lg transition-all duration-200 relative
            border-[8px] ${
              isSafe
                ? isOver
                  ? "bg-[hsl(var(--yellow))] border-[hsl(var(--navy))]"
                  : "bg-white border-[hsl(var(--navy))] hover:bg-[hsl(var(--yellow))]"
                : isOver
                ? "bg-[hsl(var(--yellow))] border-[hsl(var(--orange-red))]"
                : "bg-white border-[hsl(var(--orange-red))] hover:bg-[hsl(var(--yellow))]"
            }
          `}
          style={{
            boxShadow: `0 6px 0px ${isSafe ? 'hsl(var(--orange-red))' : 'hsl(var(--navy))'}`,
          }}
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
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                  strokeWidth={4}
                  style={{ color: isOver ? 'hsl(var(--navy))' : 'hsl(156 60% 35%)' }}
                />
              ) : (
                <X
                  className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                  strokeWidth={4}
                  style={{ color: isOver ? 'hsl(var(--orange-red))' : 'hsl(9 88% 50%)' }}
                />
              )}
            </motion.div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold" style={{
              color: isSafe ? (isOver ? 'hsl(var(--navy))' : 'hsl(156 60% 35%)') : (isOver ? 'hsl(var(--orange-red))' : 'hsl(9 88% 50%)'),
              textShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)'
            }}>
              {label}
            </h3>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
