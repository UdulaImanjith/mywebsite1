
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { AdminTool } from "@/components/AdminTool";
import { ProjectModal } from "@/components/ProjectModal";
import { 
  Palette, 
  Code, 
  Video, 
  Box, 
  Globe, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  ArrowRight,
  Briefcase,
  Facebook,
  MessageCircle,
  Trophy,
  Users,
  Calendar,
  Lock
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Graphic Design",
    description: "Creative branding, logo design, and high-impact visual communication.",
    icon: <Palette className="w-8 h-8 text-primary" />,
  },
  {
    title: "Web Development",
    description: "Responsive, high-performance websites built with the latest technologies.",
    icon: <Code className="w-8 h-8 text-primary" />,
  },
  {
    title: "Video Editing",
    description: "Professional post-production, color grading, and dynamic storytelling.",
    icon: <Video className="w-8 h-8 text-primary" />,
  },
  {
    title: "Animation & 3D",
    description: "Immersive 3D modeling and fluid motion graphics that bring concepts to life.",
    icon: <Box className="w-8 h-8 text-primary" />,
  },
];

const staticProjects = [
  {
    id: "1",
    title: "Modern Tech Flyer",
    category: "Graphic",
    subCategory: "Flyers",
    description: "A professional promotional flyer designed for a tech conference.",
    imageUrl: "https://picsum.photos/seed/p1/800/600",
    tags: ["Print", "Flyer"],
    showViewLink: true,
    projectUrl: "https://behance.net"
  },
  {
    id: "2",
    title: "Corporate Identity Card",
    category: "Graphic",
    subCategory: "Business Cards",
    description: "Minimalist business cards for a high-profile law firm.",
    imageUrl: "https://picsum.photos/seed/p2/800/600",
    tags: ["Branding", "Card"],
    showViewLink: false,
    projectUrl: "#"
  },
  {
    id: "3",
    title: "SaaS Dashboard",
    category: "Web",
    subCategory: "Dashboards",
    description: "A comprehensive dashboard for managing cloud infrastructure.",
    imageUrl: "https://picsum.photos/seed/p3/800/600",
    tags: ["React", "UI"],
    showViewLink: true,
    projectUrl: "https://github.com"
  },
  {
    id: "4",
    title: "Foodie App UI",
    category: "Web",
    subCategory: "Mobile UX",
    description: "User journey mapping for a food delivery platform.",
    imageUrl: "https://picsum.photos/seed/p4/800/600",
    tags: ["Figma", "UX"],
    showViewLink: true,
    projectUrl: "https://figma.com"
  },
  {
    id: "5",
    title: "3D Product Render",
    category: "3D",
    subCategory: "Visuals",
    description: "Photorealistic rendering for a luxury watch brand.",
    imageUrl: "https://picsum.photos/seed/p5/800/600",
    tags: ["Blender", "Octane"],
    showViewLink: true,
    projectUrl: "https://artstation.com"
  }
];

const experiences = [
  {
    company: "Pixel Perfect Agency",
    position: "Senior Graphic Designer",
    duration: "2022 - Present",
    description: "Leading creative teams in developing brand identities."
  },
  {
    company: "DevStream Solutions",
    position: "Full Stack Developer",
    duration: "2020 - 2022",
    description: "Building scalable web applications."
  }
];

const stats = [
  { label: "Projects Completed", value: "150+", icon: <Trophy className="w-5 h-5" /> },
  { label: "Happy Clients", value: "80+", icon: <Users className="w-5 h-5" /> },
  { label: "Years Experience", value: "6+", icon: <Calendar className="w-5 h-5" /> },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [subFilter, setSubFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Cursor Trail Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Filter Logic
  const categories = ["All", "Graphic", "Web", "App Development", "3D"];
  const subCategories = filter === "All" 
    ? [] 
    : ["All", ...Array.from(new Set(staticProjects.filter(p => p.category === filter).map(p => p.subCategory)))];

  const filteredProjects = staticProjects.filter(p => {
    const matchesCat = filter === "All" || p.category === filter;
    const matchesSub = subFilter === "All" || p.subCategory === subFilter;
    return matchesCat && matchesSub;
  });

  return (
    <div className="relative min-h-screen">
      {/* Cursor Trail */}
      <div 
        className="cursor-trail hidden md:block" 
        style={{ transform: `translate(${mousePos.x - 10}px, ${mousePos.y - 10}px)` }} 
      />
      <div 
        className="cursor-dot hidden md:block" 
        style={{ transform: `translate(${mousePos.x - 3}px, ${mousePos.y - 3}px)` }} 
      />

      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8 animate-fade-in">
          <Badge className="bg-primary/10 text-primary border-primary/20 py-1.5 px-4 mb-4">
            Available for new projects
          </Badge>
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-tight">
            Hello, I'm <span className="text-gradient">Udula Imanjith</span>
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-md orange-glow" asChild>
              <a href="#projects">Explore Work <ArrowRight className="ml-2 w-4 h-4" /></a>
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-secondary rounded-full px-8 h-12 text-md" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group flex justify-center">
            <div className="relative rounded-3xl p-1 border border-primary/20 overflow-hidden aspect-square w-full max-w-md">
              <img 
                src="https://picsum.photos/seed/udula/800/800" 
                alt="Udula Imanjith" 
                className="rounded-3xl grayscale hover:grayscale-0 transition-all duration-700 object-cover w-full h-full scale-105 group-hover:scale-100"
                data-ai-hint="portrait man"
              />
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">About Me</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Expertise Built Over Years</h2>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Based in the digital realm, I specialize in crafting digital experiences that are not just beautiful, but solve real-world problems. With a background in both technical engineering and creative design, I offer a unique perspective on every project.
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center p-4 bg-card/50 rounded-2xl border border-border/50">
                  <div className="mb-2 text-primary">{stat.icon}</div>
                  <span className="text-2xl font-bold font-headline">{stat.value}</span>
                  <span className="text-xs text-muted-foreground uppercase">{stat.label}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" /> Professional Experience
              </h3>
              <div className="space-y-4">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="border-l-2 border-primary/20 pl-6 relative">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                    <h4 className="font-bold text-lg">{exp.position}</h4>
                    <p className="text-primary font-medium text-sm">{exp.company} • {exp.duration}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto flex flex-col items-center mb-12 space-y-8">
          <div className="text-center space-y-4">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Selected Work</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Showcase of Excellence</h2>
          </div>
          
          {/* Main Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(cat => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => { setFilter(cat); setSubFilter("All"); }}
                className={cn("rounded-full px-6", filter === cat ? "bg-primary text-white" : "border-border")}
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Sub Categories */}
          {subCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 animate-fade-in">
              {subCategories.map(sub => (
                <Button
                  key={sub}
                  variant={subFilter === sub ? "secondary" : "ghost"}
                  onClick={() => setSubFilter(sub)}
                  className={cn("rounded-full px-4 text-xs h-8", subFilter === sub ? "bg-accent/20 text-accent" : "text-muted-foreground")}
                >
                  {sub}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] border border-border/50"
              onClick={() => setSelectedProject(project)}
            >
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <h3 className="text-2xl font-headline font-bold text-white">{project.title}</h3>
                <p className="text-white/70 text-sm">{project.subCategory}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">Get In Touch</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Let's Create Something Great</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button variant="outline" className="h-14 gap-3 justify-start px-6 border-border hover:bg-primary/10 hover:border-primary transition-all group" asChild>
                <a href="https://wa.me/yournumber"><MessageCircle className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" /> WhatsApp</a>
              </Button>
              <Button variant="outline" className="h-14 gap-3 justify-start px-6 border-border hover:bg-primary/10 hover:border-primary transition-all group" asChild>
                <a href="https://facebook.com"><Facebook className="w-5 h-5 text-blue-500 group-hover:scale-110 transition-transform" /> Facebook</a>
              </Button>
              <Button variant="outline" className="h-14 gap-3 justify-start px-6 border-border hover:bg-primary/10 hover:border-primary transition-all group" asChild>
                <a href="https://linkedin.com"><Linkedin className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" /> LinkedIn</a>
              </Button>
              <Button variant="outline" className="h-14 gap-3 justify-start px-6 border-border hover:bg-primary/10 hover:border-primary transition-all group" asChild>
                <a href="https://github.com"><Github className="w-5 h-5 text-white group-hover:scale-110 transition-transform" /> GitHub</a>
              </Button>
            </div>
          </div>

          <Card className="bg-card border-border/50 p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Your Name" className="bg-background/50 border-border" />
                <Input placeholder="Your Email" type="email" className="bg-background/50 border-border" />
              </div>
              <Textarea placeholder="Tell me more about your project..." className="min-h-[150px] bg-background/50 border-border" />
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 orange-glow">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Admin Toggle */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-6 right-6 w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-lg z-[100]"
      >
        <Lock className="w-4 h-4" />
      </button>

      {isAdminOpen && <AdminTool onClose={() => setIsAdminOpen(false)} />}

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
