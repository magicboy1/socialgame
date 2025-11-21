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
    <div ref={setNodeRef} className="flex-1 min-h-[200px] md:min-h-[250px]">
      <motion.div
        animate={{
          scale: isOver ? 1.05 : 1,
          y: isOver ? -10 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="h-full"
      >
        <Card
          className={`
            h-full flex flex-col items-center justify-center gap-6 rounded-3xl border-8 transition-all duration-300
            ${
              isSafe
                ? isOver
                  ? "bg-[#2D8B7E] border-[#2D8B7E] shadow-2xl"
                  : "bg-[#2D8B7E]/20 border-[#2D8B7E]/40 hover:border-[#2D8B7E]/60"
                : isOver
                ? "bg-[#E85D5D] border-[#E85D5D] shadow-2xl"
                : "bg-[#E85D5D]/20 border-[#E85D5D]/40 hover:border-[#E85D5D]/60"
            }
          `}
          data-testid={`drop-zone-${value ? "safe" : "unsafe"}`}
        >
          <motion.div
            animate={{
              scale: isOver ? [1, 1.2, 1] : 1,
              rotate: isOver ? [0, 5, -5, 0] : 0,
            }}
            transition={{ duration: 0.5, repeat: isOver ? Infinity : 0 }}
          >
            {isSafe ? (
              <Check
                className={`w-24 h-24 ${isOver ? "text-white" : "text-[#2D8B7E]"}`}
                strokeWidth={5}
              />
            ) : (
              <X
                className={`w-24 h-24 ${isOver ? "text-white" : "text-[#E85D5D]"}`}
                strokeWidth={5}
              />
            )}
          </motion.div>

          <h3
            className={`text-4xl md:text-5xl font-bold ${
              isOver ? "text-white" : isSafe ? "text-[#2D8B7E]" : "text-[#E85D5D]"
            }`}
          >
            {label}
          </h3>

          {isOver && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-bold text-white"
            >
              اترك هنا
            </motion.p>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
