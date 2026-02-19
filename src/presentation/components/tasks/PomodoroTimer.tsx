import { useState, useEffect, useCallback } from "react";
import { cn } from "@/shared/lib/utils";
import { Play, Pause, RotateCcw, Coffee } from "lucide-react";

interface PomodoroTimerProps {
  onBreakSuggestion?: () => void;
}

export function PomodoroTimer({ onBreakSuggestion }: PomodoroTimerProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isBreak, setIsBreak] = useState(false);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = isBreak
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  }, [isBreak]);

  const toggleBreak = () => {
    setIsBreak(!isBreak);
    setTimeLeft(!isBreak ? 5 * 60 : 25 * 60);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      if (!isBreak) {
        onBreakSuggestion?.();
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, isBreak, onBreakSuggestion]);

  return (
    <div className="control-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Timer de Foco</h3>
        <button
          onClick={toggleBreak}
          className={cn(
            "flex items-center gap-2 text-xs py-1.5 px-3 rounded-lg transition-colors",
            isBreak ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
          )}
        >
          <Coffee className="w-3 h-3" />
          {isBreak ? "Pausa" : "Foco"}
        </button>
      </div>

      {/* Timer display */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        {/* Background circle */}
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="8"
          />
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke={isBreak ? "hsl(var(--accent-foreground))" : "hsl(var(--primary))"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={2 * Math.PI * 70 * (1 - progress / 100)}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-foreground font-display">
            {formatTime(timeLeft)}
          </span>
          <span className="text-xs text-muted-foreground mt-1">
            {isBreak ? "Tempo de pausa" : "Tempo de foco"}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={reset}
          className="p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
          aria-label="Reiniciar timer"
        >
          <RotateCcw className="w-5 h-5 text-muted-foreground" />
        </button>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={cn(
            "p-4 rounded-xl transition-all duration-300",
            isRunning
              ? "bg-warning text-warning-foreground"
              : "bg-primary text-primary-foreground"
          )}
          aria-label={isRunning ? "Pausar" : "Iniciar"}
        >
          {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </button>
        <div className="w-12" /> {/* Spacer for symmetry */}
      </div>
    </div>
  );
}
