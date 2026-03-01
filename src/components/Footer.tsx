
"use client";

import { Instagram, Github, Linkedin, Facebook, Twitter, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary/50 border-t border-border pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl rotate-3 group-hover:rotate-0 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4V14C4 16.2091 5.79086 18 8 18H10C12.2091 18 14 16.2091 14 14V4" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M19 4V18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M17 18H21" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-headline font-bold text-xl tracking-tight text-foreground">
                Udula<span className="text-primary">Imanjith</span>
              </span>
            </a>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Crafting digital excellence through creative design and technical precision. Let's build something extraordinary together.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com/udula" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary text-muted-foreground hover:text-primary transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com/in/udula" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary text-muted-foreground hover:text-primary transition-all">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/udula" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary text-muted-foreground hover:text-primary transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com/udula" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary text-muted-foreground hover:text-primary transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline font-bold uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-headline font-bold uppercase tracking-widest text-xs">Availability</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Currently accepting new projects and collaborations. Reach out to discuss your ideas.
            </p>
            <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-widest">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for Freelance
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-muted-foreground">
            © {currentYear} UdulaImanjith Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
