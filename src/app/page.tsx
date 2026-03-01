
"use client";

import { useState, useEffect, useMemo } from "react";
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
  MessageCircle,
  Send,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useCollection, useDoc, useFirestore } from "@/firebase";
import { collection, query, orderBy, doc } from "firebase/firestore";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const skills = [
  "Adobe Photoshop", "Adobe Illustrator", "After Effects", "Blender", "Figma"
];

const defaultProjects = [
  { id: "1", title: "Corporate Flyer Set", category: "Graphic", subCategory: "Flyers", imageUrl: "https://picsum.photos/seed/flyer1/800/600", description: "A set of professional flyers for a corporate event.", tags: ["Print", "Flyer"], projectUrl: "#", showViewLink: true },
  { id: "2", title: "Luxury Business Cards", category: "Graphic", subCategory: "Cards", imageUrl: "https://picsum.photos/seed/card1/800/600", description: "Minimalist business cards for high-end clients.", tags: ["Identity", "Card"], projectUrl: "#", showViewLink: true },
  { id: "3", title: "E-commerce Platform", category: "Web", subCategory: "E-commerce", imageUrl: "https://picsum.photos/seed/web1/800/600", description: "Full-stack e-commerce solution with React.", tags: ["React", "Node"], projectUrl: "#", showViewLink: true },
  { id: "4", title: "3D Character Hero", category: "3D", subCategory: "Animation", imageUrl: "https://picsum.photos/seed/3d1/800/600", description: "Rigged and animated character for a game project.", tags: ["Blender", "Rigging"], projectUrl: "#", showViewLink: true },
];

const defaultTestimonials = [
  { id: "t1", name: "John Smith", role: "Marketing Director", text: "Udula delivered exceptional work on our branding. Highly recommended!", avatar: "https://picsum.photos/seed/t1/100/100" },
  { id: "t2", name: "Sarah Williams", role: "CEO, TechFlow", text: "The website developed by Udula exceeded our expectations in every way.", avatar: "https://picsum.photos/seed/t2/100/100" },
];

export default function Portfolio() {
  const db = useFirestore();
  const [filter, setFilter] = useState("All");
  const [subFilter, setSubFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const projectsRef = useMemo(() => (db ? collection(db, "projects") : null), [db]);
  const { data: dbProjects = [] } = useCollection(projectsRef);
  const projects = dbProjects.length > 0 ? dbProjects : defaultProjects;

  const experiencesRef = useMemo(() => (db ? collection(db, "experiences") : null), [db]);
  const { data: dbExperiences = [] } = useCollection(experiencesRef);
  const experiences = dbExperiences.length > 0 ? dbExperiences : [
    { company: "Company A", position: "Lead Designer", duration: "2021 - Present", description: "Leading creative teams in digital transformation." },
    { company: "Company B", position: "Web Developer", duration: "2019 - 2021", description: "Building responsive web applications and APIs." }
  ];

  const testimonialsRef = useMemo(() => (db ? collection(db, "testimonials") : null), [db]);
  const { data: dbTestimonials = [] } = useCollection(testimonialsRef);
  const testimonials = dbTestimonials.length > 0 ? dbTestimonials : defaultTestimonials;

  const settingsRef = useMemo(() => (db ? doc(db, "settings", "global") : null), [db]);
  const { data: settings } = useDoc(settingsRef);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const categories = ["All", "Graphic", "Web", "App Development", "3D"];
  const subCategories = useMemo(() => {
    if (filter === "All") return [];
    const subs = projects
      .filter((p: any) => p.category === filter)
      .map((p: any) => p.subCategory)
      .filter(Boolean);
    return ["All", ...Array.from(new Set(subs))];
  }, [filter, projects]);

  const filteredProjects = projects.filter((p: any) => {
    const matchesCat = filter === "All" || p.category === filter;
    const matchesSub = subFilter === "All" || p.subCategory === subFilter;
    return matchesCat && matchesSub;
  });

  const profileImage = PlaceHolderImages.find(img => img.id === "profile-photo")?.imageUrl || "https://picsum.photos/seed/udula/600/800";

  if (settings?.maintenanceMode) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10 animate-pulse" />
        
        <div className="space-y-8 animate-fade-in relative z-10">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
            <Cpu className="w-20 h-20 text-primary relative animate-bounce" />
          </div>
          
          <div className="space-y-4">
            <Badge variant="outline" className="border-primary/20 text-primary px-4 py-1 text-xs font-bold uppercase tracking-widest bg-primary/5">
              System Update
            </Badge>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter">
              Enhancing the <span className="text-gradient">Studio</span>
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto leading-relaxed text-sm md:text-base">
              UdulaImanjith is currently upgrading the creative engine. We'll be back shortly with a refined digital experience.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 text-primary font-medium">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span className="text-xs uppercase tracking-widest font-bold">Coming back better</span>
          </div>
        </div>

        {/* Admin Toggle is kept visible for owner access */}
        <button 
          onClick={() => setIsAdminOpen(true)}
          className="fixed bottom-6 right-6 w-10 h-10 bg-card/50 backdrop-blur-md border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all shadow-lg z-[100]"
        >
          <Lock className="w-4 h-4" />
        </button>
        {isAdminOpen && <AdminTool onClose={() => setIsAdminOpen(false)} />}
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
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left side: Photo */}
            <div className="relative group mx-auto lg:mx-0 max-w-[450px]">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl group-hover:bg-primary/30 transition-all duration-500" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[3/4]">
                <img 
                  src={profileImage} 
                  alt="Udula Imanjith" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                />
              </div>
            </div>

            {/* Right side: Content */}
            <div className="space-y-10">
              <div className="space-y-4">
                <span className="text-primary font-bold uppercase tracking-widest text-sm">About Me</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold">Creative Visionary</h2>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  I am a passionate creator dedicated to pushing the boundaries of digital design. With a focus on user experience and visual storytelling, I transform ideas into compelling realities across multiple platforms.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <p className="text-3xl font-bold text-gradient">150+</p>
                  <p className="text-[10px] uppercase text-muted-foreground tracking-widest font-bold">Projects Done</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gradient">80+</p>
                  <p className="text-[10px] uppercase text-muted-foreground tracking-widest font-bold">Happy Clients</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gradient">6+</p>
                  <p className="text-[10px] uppercase text-muted-foreground tracking-widest font-bold">Years Exp</p>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-6">
                <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" /> Professional Experience
                </h3>
                <div className="space-y-6">
                  {experiences.map((exp: any, idx: number) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        <div className="w-0.5 h-full bg-primary/10 mt-2" />
                      </div>
                      <div className="pb-4">
                        <h4 className="font-bold text-lg leading-none">{exp.position}</h4>
                        <p className="text-primary text-sm font-medium mt-1">{exp.company} • {exp.duration}</p>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{exp.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-4">
                <h3 className="text-xl font-headline font-semibold flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-primary" /> Tool Mastery
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="px-4 py-2 text-xs bg-card hover:bg-primary/10 hover:text-primary transition-colors cursor-default border-border/50">
                      {skill}
                    </Badge>
                  ))}
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

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-secondary/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Kind Words</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Client Testimonials</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((t: any) => (
              <Card key={t.id} className="bg-card border-white/5 hover:border-primary/20 transition-all p-8 space-y-6">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center gap-4">
                    <img src={t.avatar} className="w-12 h-12 rounded-full border border-primary/20" alt={t.name} />
                    <div>
                      <h4 className="font-bold text-sm">{t.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase">{t.role}</p>
                    </div>
                  </div>
                  <p className="text-sm italic text-muted-foreground">"{t.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <span className="text-primary font-bold uppercase tracking-widest text-sm">Contact</span>
                <h2 className="text-4xl md:text-5xl font-headline font-bold">Let's Connect</h2>
                <p className="text-muted-foreground max-w-md">Interested in working together? Send me a message or reach out through social platforms.</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col gap-1 rounded-2xl border-border/50 hover:border-primary/50 group" asChild>
                  <a href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-6 h-6 text-green-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase">WhatsApp</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-1 rounded-2xl border-border/50 hover:border-primary/50 group" asChild>
                  <a href="https://linkedin.com/in/udula" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase">LinkedIn</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-1 rounded-2xl border-border/50 hover:border-primary/50 group" asChild>
                  <a href="https://github.com/udula" target="_blank" rel="noopener noreferrer">
                    <Github className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase">GitHub</span>
                  </a>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-1 rounded-2xl border-border/50 hover:border-primary/50 group" asChild>
                  <a href="https://facebook.com/udula" target="_blank" rel="noopener noreferrer">
                    <Facebook className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-bold uppercase">Facebook</span>
                  </a>
                </Button>
              </div>
            </div>

            <Card className="bg-card/50 border-white/5 p-8 rounded-3xl">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Full Name</label>
                    <Input placeholder="John Doe" className="bg-background border-white/10" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-muted-foreground">Email Address</label>
                    <Input placeholder="john@example.com" type="email" className="bg-background border-white/10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-muted-foreground">Message</label>
                  <Textarea placeholder="Tell me about your project..." className="bg-background border-white/10 min-h-[150px]" />
                </div>
                <Button className="w-full bg-primary text-white h-12 rounded-xl orange-glow font-bold uppercase">
                  Send Message <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </Card>
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
