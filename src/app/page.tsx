
"use client";

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdminTool } from "@/components/AdminTool";
import { ProjectModal } from "@/components/ProjectModal";
import { 
  Palette, 
  Code, 
  Video, 
  Box, 
  ArrowRight,
  Briefcase,
  Trophy,
  Users,
  Calendar,
  Lock,
  Cpu,
  Layers,
  Wand2,
  Mail,
  Github,
  Linkedin,
  Facebook,
  MessageCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useCollection, useDoc, useFirestore } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";

const skills = [
  "Adobe Photoshop", "Adobe Illustrator", "After Effects", "Blender", 
  "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", 
  "Firebase", "Three.js", "UI/UX Design"
];

export default function Portfolio() {
  const db = useFirestore();
  const [filter, setFilter] = useState("All");
  const [subFilter, setSubFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Firestore Data
  const projectsQuery = db ? query(collection(db, "projects")) : null;
  const { data: projects = [] } = useCollection(projectsQuery);

  const experiencesQuery = db ? query(collection(db, "experiences")) : null;
  const { data: experiences = [] } = useCollection(experiencesQuery);

  const settingsRef = db ? doc(db, "settings", "global") : null;
  const { data: settings } = useDoc(settingsRef);

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
    : ["All", ...Array.from(new Set(projects.filter((p: any) => p.category === filter).map((p: any) => p.subCategory)))];

  const filteredProjects = projects.filter((p: any) => {
    const matchesCat = filter === "All" || p.category === filter;
    const matchesSub = subFilter === "All" || p.subCategory === subFilter;
    return matchesCat && matchesSub;
  });

  if (settings?.maintenanceMode) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background text-center p-6">
        <Cpu className="w-16 h-16 text-primary animate-pulse mb-6" />
        <h1 className="text-4xl font-headline font-bold mb-4">Under Maintenance</h1>
        <p className="text-muted-foreground max-w-md">
          UdulaImanjith is currently upgrading the studio. We'll be back shortly with more creative magic.
        </p>
      </div>
    );
  }

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
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 animate-fade-in">
          <Badge className="bg-primary/10 text-primary border-primary/20 py-1.5 px-4 mb-4">
            Creative Problem Solver
          </Badge>
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-tight">
            Hello, I'm <span className="text-gradient">Udula Imanjith</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I blend technical precision with artistic vision to create immersive digital experiences. 
            From pixel-perfect designs to complex web ecosystems, I bring creativity to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-md orange-glow" asChild>
              <a href="#projects">View My Portfolio <ArrowRight className="ml-2 w-4 h-4" /></a>
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-secondary rounded-full px-8 h-12 text-md" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="space-y-2">
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Expertise</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold">Skills & Experience</h2>
              </div>
              
              <div className="space-y-8">
                <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" /> Professional Timeline
                </h3>
                <div className="space-y-8">
                  {experiences.length > 0 ? experiences.map((exp: any, idx: number) => (
                    <div key={idx} className="border-l-2 border-primary/20 pl-6 relative">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
                      <h4 className="font-bold text-lg">{exp.position}</h4>
                      <p className="text-primary font-medium text-sm mb-2">{exp.company} • {exp.duration}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                    </div>
                  )) : (
                    <p className="text-muted-foreground italic">Experience details coming soon...</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-primary" /> Core Competencies
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm bg-card hover:bg-primary/10 hover:text-primary transition-colors cursor-default border-border/50">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-card/50 rounded-3xl border border-border/50 space-y-4">
                <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                  <Layers className="w-5 h-5 text-primary" /> My Approach
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  I believe in a user-centric design philosophy where every line of code and every design choice serves a purpose. I bridge the gap between imagination and execution.
                </p>
                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">150+</p>
                    <p className="text-[10px] uppercase text-muted-foreground">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">80+</p>
                    <p className="text-[10px] uppercase text-muted-foreground">Clients</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">6+</p>
                    <p className="text-[10px] uppercase text-muted-foreground">Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center mb-12 space-y-8">
          <div className="text-center space-y-4">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Creative Gallery</h2>
          </div>
          
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

          {subCategories.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 animate-fade-in">
              {subCategories.map((sub: any) => (
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
          {filteredProjects.map((project: any) => (
            <div
              key={project.id}
              className="group relative cursor-pointer overflow-hidden rounded-2xl aspect-[4/3] border border-border/50"
              onClick={() => setSelectedProject(project)}
            >
              <img 
                src={project.imageUrl || "https://picsum.photos/seed/placeholder/800/600"} 
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
      <section id="contact" className="py-24 px-6 bg-secondary/10">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Contact</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Let's Connect</h2>
            <p className="text-muted-foreground">Interested in working together? Reach out through any of these platforms.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl border-border/50 hover:border-primary/50 group" asChild>
              <a href="https://wa.me/yournumber" target="_blank">
                <MessageCircle className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">WhatsApp</span>
              </a>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl border-border/50 hover:border-primary/50 group" asChild>
              <a href="https://linkedin.com/in/udula" target="_blank">
                <Linkedin className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">LinkedIn</span>
              </a>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl border-border/50 hover:border-primary/50 group" asChild>
              <a href="https://github.com/udula" target="_blank">
                <Github className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">GitHub</span>
              </a>
            </Button>
            <Button variant="outline" className="h-24 flex flex-col gap-2 rounded-2xl border-border/50 hover:border-primary/50 group" asChild>
              <a href="https://facebook.com/udula" target="_blank">
                <Facebook className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">Facebook</span>
              </a>
            </Button>
          </div>
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
      
      <Footer />
    </div>
  );
}
