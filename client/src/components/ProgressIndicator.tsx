import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="flex flex-col gap-2 w-full max-w-xs" data-testid="progress-indicator">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-foreground">
          Question {current} of {total}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
