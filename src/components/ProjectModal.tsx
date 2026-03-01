"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Film, Image as ImageIcon } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  subCategory: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={!!project} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-card border-border/50 p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="relative aspect-video md:aspect-auto w-full h-full bg-black flex items-center justify-center">
            {project.videoUrl ? (
              <iframe
                src={project.videoUrl}
                className="w-full h-full"
                allow="autoplay; fullscreen"
                title={project.title}
              />
            ) : (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute top-4 left-4">
              <Badge className="bg-primary/90 backdrop-blur-sm">
                {project.videoUrl ? <Film className="w-3 h-3 mr-1" /> : <ImageIcon className="w-3 h-3 mr-1" />}
                {project.category}
              </Badge>
            </div>
          </div>
          
          <div className="p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle className="font-headline text-3xl text-primary">{project.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-sm uppercase tracking-widest font-semibold">
                  {project.subCategory}
                </DialogDescription>
              </DialogHeader>
              
              <p className="text-foreground leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs border-border/50 text-muted-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-border/50 mt-8 flex items-center justify-between">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-primary hover:text-accent font-semibold transition-colors"
              >
                View Project <ExternalLink className="w-4 h-4" />
              </a>
              <span className="text-xs text-muted-foreground">© 2024 Udula Imanjith</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}