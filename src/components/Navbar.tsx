
"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
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

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full text-sm font-semibold transition-all orange-glow shadow-lg shadow-primary/20"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "fixed inset-0 top-[60px] bg-background z-40 md:hidden transition-transform duration-300 ease-in-out p-6",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-headline font-semibold text-foreground hover:text-primary"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
