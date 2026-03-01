
"use client";

import { useState } from "react";
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
  Monitor,
  Quote,
  Briefcase,
  Facebook
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Graphic Design",
    description: "Creative branding, logo design, and high-impact visual communication for modern brands.",
    icon: <Palette className="w-8 h-8 text-primary" />,
  },
  {
    title: "Web Development",
    description: "Responsive, high-performance websites built with the latest technologies like Next.js.",
    icon: <Code className="w-8 h-8 text-primary" />,
  },
  {
    title: "Video Editing",
    description: "Professional post-production, color grading, and dynamic storytelling for digital media.",
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
    description: "A professional promotional flyer designed for a tech conference, highlighting speakers and schedule.",
    imageUrl: "https://picsum.photos/seed/p1/800/600",
    tags: ["Print", "Flyer", "InDesign"],
    showViewLink: true,
    projectUrl: "https://behance.net"
  },
  {
    id: "2",
    title: "Corporate Identity Card",
    category: "Graphic",
    subCategory: "Business Cards",
    description: "Minimalist business cards for a high-profile law firm, using premium typography and color schemes.",
    imageUrl: "https://picsum.photos/seed/p2/800/600",
    tags: ["Branding", "Card", "Minimalist"],
    showViewLink: false,
    projectUrl: "#"
  },
  {
    id: "3",
    title: "SaaS Dashboard",
    category: "Web",
    subCategory: "Admin UI",
    description: "A comprehensive dashboard for managing cloud infrastructure with real-time analytics.",
    imageUrl: "https://picsum.photos/seed/p3/800/600",
    tags: ["React", "Dashboard", "UI"],
    showViewLink: true,
    projectUrl: "https://github.com"
  },
  {
    id: "4",
    title: "Foodie App UI",
    category: "App Development",
    subCategory: "Mobile UX",
    description: "User journey mapping and high-fidelity wireframes for a food delivery platform.",
    imageUrl: "https://picsum.photos/seed/p4/800/600",
    tags: ["Figma", "UX", "Mobile"],
    showViewLink: true,
    projectUrl: "https://figma.com"
  }
];

const experiences = [
  {
    company: "Pixel Perfect Agency",
    position: "Senior Graphic Designer",
    duration: "2022 - Present",
    description: "Leading the creative team in developing brand identities for global tech startups."
  },
  {
    company: "DevStream Solutions",
    position: "Full Stack Developer",
    duration: "2020 - 2022",
    description: "Built and maintained scalable web applications using Next.js and Firebase."
  },
  {
    company: "Creative Vision Studio",
    position: "Junior UI Designer",
    duration: "2018 - 2020",
    description: "Assisted in creating wireframes and mockups for mobile and web platforms."
  }
];

const testimonials = [
  {
    name: "John Doe",
    role: "CEO at TechFlow",
    text: "Udula transformed our brand identity into something truly world-class. His eye for detail and technical skill in both design and web dev is rare.",
    avatar: "https://picsum.photos/seed/client1/100/100",
  },
  {
    name: "Sarah Miller",
    role: "Creative Director",
    text: "The 3D modeling work Udula did for our marketing campaign exceeded all expectations. Fast, creative, and professional.",
    avatar: "https://picsum.photos/seed/client2/100/100",
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const filteredProjects = filter === "All" 
    ? staticProjects 
    : staticProjects.filter(p => p.category === filter);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
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
            <br />
            Creative Designer & Dev
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Bridging the gap between aesthetics and functionality. Graphic design, web development, 3D art, and motion design—all in one place.
          </p>
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
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-2xl group-hover:bg-primary/30 transition-all duration-700" />
            <div className="relative rounded-full p-2 border-4 border-primary/20 overflow-hidden aspect-square">
              <img 
                src="https://picsum.photos/seed/udula/800/800" 
                alt="Udula Imanjith" 
                className="rounded-full grayscale hover:grayscale-0 transition-all duration-700 object-cover w-full h-full scale-105 group-hover:scale-100"
                data-ai-hint="portrait man"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">About Me</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Expertise Built Over Years</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Based in the digital realm, I specialize in crafting digital experiences that are not just beautiful, but solve real-world problems. With a background in both technical engineering and creative design, I offer a unique perspective on every project.
            </p>
            
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
                    <p className="text-muted-foreground text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-headline font-semibold">Technical Stack:</h3>
              <div className="flex flex-wrap gap-3">
                {["Photoshop", "Next.js", "React Native", "Blender", "After Effects", "Figma", "TypeScript"].map(skill => (
                  <Badge key={skill} variant="secondary" className="px-4 py-1.5 text-sm bg-background border border-border">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16 space-y-4">
          <span className="text-primary font-bold uppercase tracking-widest text-sm">My Services</span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">What I Bring to the Table</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <Card key={idx} className="bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift overflow-hidden group">
              <CardContent className="p-8 space-y-4">
                <div className="mb-6 p-4 bg-background rounded-xl inline-block group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="text-xl font-headline font-bold">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Selected Work</span>
            <h2 className="text-4xl md:text-5xl font-headline font-bold">Showcase of Excellence</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Graphic", "Web", "App Development", "3D"].map(cat => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className={cn(
                  "rounded-full px-6 transition-all",
                  filter === cat ? "bg-primary text-white" : "border-border hover:bg-secondary"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
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
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex gap-2 mb-2">
                    <Badge className="bg-primary text-white">{project.category}</Badge>
                    <Badge variant="outline" className="text-white border-white/30 bg-black/30 backdrop-blur-sm">{project.subCategory}</Badge>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
                </div>
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
            <p className="text-lg text-muted-foreground">
              Have a project in mind? Looking to hire a full-time creative? Or just want to say hi? Feel free to reach out.
            </p>
            
            <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email me at</p>
                  <p className="font-bold">hello@udulaimanjith.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Globe className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Social Connect</p>
                  <div className="flex gap-4 mt-2">
                    <a href="https://facebook.com" className="hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                    <a href="https://linkedin.com" className="hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
                    <a href="https://instagram.com" className="hover:text-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                    <a href="https://github.com" className="hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card className="bg-card border-border/50 p-8">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input placeholder="Your Name" className="bg-background/50 border-border" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input placeholder="Your Email" type="email" className="bg-background/50 border-border" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea placeholder="Tell me more about your project..." className="min-h-[150px] bg-background/50 border-border" />
              </div>
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-12 orange-glow">
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Admin Section */}
      <AdminTool />

      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-headline font-bold text-xl">
              Udula<span className="text-primary">Imanjith</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Udula Imanjith. All rights reserved.
          </p>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
