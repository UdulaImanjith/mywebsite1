
"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft, Ghost } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-background p-6">
      <div className="relative mb-8">
        <Ghost className="w-24 h-24 text-primary/20 animate-bounce" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl font-headline font-bold text-primary opacity-20">404</span>
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-headline font-bold mb-4 text-center">Lost in Pixels?</h1>
      <p className="text-muted-foreground text-center max-w-md mb-8 leading-relaxed">
        The page you are looking for has been moved to another dimension or never existed in this studio.
      </p>
      <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white orange-glow">
        <Link href="/">
          <MoveLeft className="w-4 h-4 mr-2" /> Back to Studio
        </Link>
      </Button>
    </div>
  );
}
