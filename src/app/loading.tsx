
"use client";

import { Cpu, Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background p-6">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
        <Cpu className="w-16 h-16 text-primary animate-spin" style={{ animationDuration: '3s' }} />
      </div>
      <div className="flex items-center gap-2 text-primary font-medium">
        <Sparkles className="w-4 h-4 animate-bounce" />
        <span className="text-xs uppercase tracking-widest font-bold animate-pulse">Initializing Studio...</span>
      </div>
    </div>
  );
}
