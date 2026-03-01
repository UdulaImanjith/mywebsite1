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
  Layers, 
  Globe, 
  CheckCircle2, 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  ArrowRight,
  Monitor,
  Cpu,
  Smartphone,
  Quote,
  Rocket
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

const projects = [
  {
    id: "1",
    title: "EcoBrand Identity",
    category: "Graphic",
    subCategory: "Branding",
    description: "A complete visual identity redesign for an eco-conscious tech startup focusing on sustainability.",
    imageUrl: PlaceHolderImages.find(img => img.id === 'project-graphic-1')?.imageUrl || "",
    tags: ["Branding", "Logo Design", "Print"],
  },
  {
    id: "2",
    title: "Modern Portfolio",
    category: "Web",
    subCategory: "Next.js",
    description: "A high-performance personal portfolio built with Next.js and Tailwind CSS with smooth animations.",
    imageUrl: PlaceHolderImages.find(img => img.id === 'project-web-1')?.imageUrl || "",
    tags: ["Next.js", "React", "Frontend"],
  },
  {
    id: "3",
    title: "Apex Finance App",
    category: "App Development",
    subCategory: "React Native",
    description: "A fintech mobile application designed for seamless cryptocurrency tracking and trading.",
    imageUrl: PlaceHolderImages.find(img => img.id === 'project-app-1')?.imageUrl || "",
    tags: ["Mobile", "UI/UX", "iOS/Android"],
  },
  {
    id: "4",
    title: "Cyborg Character",
    category: "3D",
    subCategory: "Modeling",
    description: "Detailed 3D character design and rigging for a futuristic sci-fi game concept.",
    imageUrl: PlaceHolderImages.find(img => img.id === 'project-3d-1')?.imageUrl || "",
    tags: ["Blender", "Character Art", "3D"],
  },
  {
    id: "5",
    title: "Brand Film",
    category: "Graphic",
    subCategory: "Motion",
    description: "A dynamic motion graphics piece showcasing the features of a new digital banking platform.",
    imageUrl: PlaceHolderImages.find(img => img.id === 'hero-bg')?.imageUrl || "",
    videoUrl: "https://player.vimeo.com/video/100000000",
    tags: ["After Effects", "Motion Design", "Video"],
  }
];

const testimonials = [
  {
    name: "John Doe",
    role: "CEO at TechFlow",
    text: "Udula transformed our brand identity into something truly world-class. His eye for detail and technical skill in both design and web dev is rare.",
    avatar: PlaceHolderImages.find(img => img.id === 'testimonial-1')?.imageUrl || "",
  },
  {
    name: "Sarah Miller",
    role: "Creative Director",
    text: "The 3D modeling work Udula did for our marketing campaign exceeded all expectations. Fast, creative, and professional.",
    avatar: PlaceHolderImages.find(img => img.id === 'testimonial-2')?.imageUrl || "",
  },
  {
    name: "Alex Zhang",
    role: "Founder, Zenith App",
    text: "Working with Udula on our app development was a breeze. He understands user experience deeply and writes clean, maintainable code.",
    avatar: PlaceHolderImages.find(img => img.id === 'testimonial-3')?.imageUrl || "",
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8 animate-fade-in">
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 py-1.5 px-4 mb-4">
            Available for new projects
          </Badge>
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-tight">
            I am <span className="text-gradient">Udula Imanjith</span>
            <br />
            Creative Designer & Dev
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
            Bridging the gap between aesthetics and functionality. Graphic design, web development, 3D art, and motion design—all in one place.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-md orange-glow" asChild>
              <a href="#projects">View My Work <ArrowRight className="ml-2 w-4 h-4" /></a>
            </Button>
            <Button size="lg" variant="outline" className="border-border hover:bg-secondary rounded-full px-8 h-12 text-md" asChild>
              <a href="#about">About Me</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/20 rounded-2xl blur-xl group-hover:bg-primary/30 transition-all duration-500" />
            <img 
              src={PlaceHolderImages.find(img => img.id === 'hero-bg')?.imageUrl || ""} 
              alt="Udula Imanjith" 
              className="relative rounded-2xl grayscale hover:grayscale-0 transition-all duration-500 border border-border aspect-square object-cover"
            />
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-primary font-bold uppercase tracking-widest text-sm">About Me</span>
              <h2 className="text-4xl md:text-5xl font-headline font-bold">Expertise Built Over Years</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Based in the digital realm, I specialize in crafting digital experiences that are not just beautiful, but solve real-world problems. With a background in both technical engineering and creative design, I offer a unique perspective on every project.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="text-primary font-bold text-2xl">80+</h4>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-primary font-bold text-2xl">5+</h4>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-headline font-semibold">What I Master:</h3>
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
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Badge className="mb-2 bg-primary text-white">{project.category}</Badge>
                  <h3 className="text-2xl font-headline font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16 space-y-4">
          <span className="text-primary font-bold uppercase tracking-widest text-sm">Client Love</span>
          <h2 className="text-4xl md:text-5xl font-headline font-bold">Trusted by Brands Worldwide</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <Card key={idx} className="bg-card border-border/50 p-8 space-y-6 relative hover:border-primary/30 transition-colors">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10" />
              <p className="text-lg leading-relaxed italic text-muted-foreground relative z-10">
                "{t.text}"
              </p>
              <div className="flex items-center gap-4 border-t border-border pt-6">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-foreground">{t.name}</h4>
                  <p className="text-sm text-primary">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Admin Content Refiner Tool (GenAI Component) */}
      <AdminTool />

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-secondary/30">
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
                  <p className="font-bold">hello@pixelcanvas.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Monitor className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Follow my journey</p>
                  <div className="flex gap-4 mt-1">
                    <Instagram className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                    <Linkedin className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                    <Github className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
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
                <label className="text-sm font-medium">Subject</label>
                <Input placeholder="What are we talking about?" className="bg-background/50 border-border" />
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

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-lg">
              <Rocket className="w-4 h-4 text-white" />
            </div>
            <span className="font-headline font-bold text-xl">
              PixelCanvas<span className="text-primary">Studio</span>
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Udula Imanjith. All rights reserved. Made with ❤️ and PixelCanvas magic.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm hover:text-primary">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-primary">Terms of Service</a>
          </div>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
}
