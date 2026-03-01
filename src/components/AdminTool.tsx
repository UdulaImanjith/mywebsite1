"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings, 
  Plus, 
  Trash, 
  X, 
  Save, 
  Briefcase, 
  MessageSquare, 
  LayoutGrid, 
  Edit,
  Lock,
  Loader2
} from "lucide-react";
import { useCollection, useFirestore } from "@/firebase";
import { collection, doc, addDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

const ADMIN_PASSWORD = "admin123";

interface AdminToolProps {
  onClose: () => void;
}

export function AdminTool({ onClose }: AdminToolProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const db = useFirestore();
  const { toast } = useToast();

  const projectsRef = db ? collection(db, "projects") : null;
  const { data: projects = [] } = useCollection(projectsRef);

  const testimonialsRef = db ? collection(db, "testimonials") : null;
  const { data: testimonials = [] } = useCollection(testimonialsRef);

  const experiencesRef = db ? collection(db, "experiences") : null;
  const { data: experiences = [] } = useCollection(experiencesRef);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      toast({ title: "Error", description: "Incorrect password", variant: "destructive" });
    }
  };

  const handleUpdate = async (col: string, id: string, data: any) => {
    if (!db) return;
    setIsProcessing(true);
    try {
      await updateDoc(doc(db, col, id), data);
      toast({ title: "Success", description: "Item updated successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to update item", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (col: string, id: string) => {
    if (!db) return;
    if (!confirm("Are you sure you want to delete this item?")) return;
    setIsProcessing(true);
    try {
      await deleteDoc(doc(db, col, id));
      toast({ title: "Deleted", description: "Item removed" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to delete item", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAdd = async (col: string, data: any) => {
    if (!db) return;
    setIsProcessing(true);
    try {
      await addDoc(collection(db, col), data);
      toast({ title: "Success", description: "Item added successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to add item", variant: "destructive" });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-primary/20 bg-card z-[110]">
          <CardHeader>
            <CardTitle className="text-center font-headline">Administration Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input 
                type="password" 
                placeholder="Enter admin password..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2">
                <Button type="submit" className="flex-1 bg-primary text-white">Login</Button>
                <Button type="button" variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-6 overflow-y-auto">
      <Card className="max-w-6xl w-full border-primary/20 bg-card shadow-2xl relative h-[90vh] flex flex-col z-[110]">
        <Button variant="ghost" size="icon" className="absolute right-4 top-4 z-20" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl text-gradient">
            <Settings className="w-6 h-6 text-primary" />
            Control Center
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto scrollbar-hide">
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-background/50 mb-6 sticky top-0 z-10">
              <TabsTrigger value="projects" className="flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Projects</TabsTrigger>
              <TabsTrigger value="testimonials" className="flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Testimonials</TabsTrigger>
              <TabsTrigger value="experience" className="flex items-center gap-2"><Briefcase className="w-4 h-4" /> Experience</TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2"><Settings className="w-4 h-4" /> Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold">Managed Projects ({projects.length})</h4>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-primary text-white"><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-card border-border overflow-y-auto max-h-[90vh]">
                    <DialogHeader><DialogTitle>Create New Project</DialogTitle></DialogHeader>
                    <ProjectForm onSave={(data) => handleAdd("projects", data)} isProcessing={isProcessing} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((p: any) => (
                  <AdminItemCard 
                    key={p.id} 
                    title={p.title} 
                    subtitle={`${p.category} • ${p.subCategory}`}
                    image={p.imageUrl}
                    onDelete={() => handleDelete("projects", p.id)}
                    isProcessing={isProcessing}
                  >
                    <ProjectForm 
                      initialData={p} 
                      onSave={(data) => handleUpdate("projects", p.id, data)} 
                      isProcessing={isProcessing}
                    />
                  </AdminItemCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold">Client Feedback ({testimonials.length})</h4>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-primary text-white"><Plus className="w-4 h-4 mr-2" /> Add Testimonial</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-card border-border overflow-y-auto max-h-[90vh]">
                    <DialogHeader><DialogTitle>New Testimonial</DialogTitle></DialogHeader>
                    <TestimonialForm onSave={(data) => handleAdd("testimonials", data)} isProcessing={isProcessing} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((t: any) => (
                  <AdminItemCard 
                    key={t.id} 
                    title={t.name} 
                    subtitle={t.role}
                    image={t.avatar}
                    onDelete={() => handleDelete("testimonials", t.id)}
                    isProcessing={isProcessing}
                  >
                    <TestimonialForm 
                      initialData={t} 
                      onSave={(data) => handleUpdate("testimonials", t.id, data)} 
                      isProcessing={isProcessing}
                    />
                  </AdminItemCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold">Work History ({experiences.length})</h4>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" className="bg-primary text-white"><Plus className="w-4 h-4 mr-2" /> Add Experience</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-card border-border overflow-y-auto max-h-[90vh]">
                    <DialogHeader><DialogTitle>Add Experience</DialogTitle></DialogHeader>
                    <ExperienceForm onSave={(data) => handleAdd("experiences", data)} isProcessing={isProcessing} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {experiences.map((exp: any) => (
                  <AdminItemCard 
                    key={exp.id} 
                    title={exp.position} 
                    subtitle={`${exp.company} • ${exp.duration}`}
                    onDelete={() => handleDelete("experiences", exp.id)}
                    isProcessing={isProcessing}
                  >
                    <ExperienceForm 
                      initialData={exp} 
                      onSave={(data) => handleUpdate("experiences", exp.id, data)} 
                      isProcessing={isProcessing}
                    />
                  </AdminItemCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="p-6 bg-background rounded-xl border space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Maintenance Mode</Label>
                    <p className="text-xs text-muted-foreground">Show a temporary splash screen to visitors</p>
                  </div>
                  <Switch 
                    onCheckedChange={(checked) => db && setDoc(doc(db, "settings", "global"), { maintenanceMode: checked }, { merge: true })} 
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminItemCard({ title, subtitle, image, children, onDelete, isProcessing }: any) {
  return (
    <div className="p-4 rounded-xl bg-background border flex items-center justify-between group">
      <div className="flex items-center gap-4">
        {image && <img src={image} className="w-12 h-12 rounded object-cover border" alt="" />}
        <div className="max-w-[150px] truncate">
          <p className="font-bold text-sm leading-tight truncate">{title}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider truncate">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-card border-border overflow-y-auto max-h-[90vh]">
            <DialogHeader><DialogTitle>Edit Details</DialogTitle></DialogHeader>
            {children}
          </DialogContent>
        </Dialog>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-destructive" 
          onClick={onDelete}
          disabled={isProcessing}
        >
          {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}

function ProjectForm({ initialData, onSave, isProcessing }: { initialData?: any; onSave: (data: any) => void; isProcessing: boolean }) {
  const [formData, setFormData] = useState(initialData || {
    title: "",
    category: "Graphic",
    subCategory: "",
    description: "",
    imageUrl: "",
    projectUrl: "",
    showViewLink: true,
    tags: []
  });

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
    setFormData({ ...formData, tags });
  };

  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Title</Label>
          <Input value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Category</Label>
          <Input value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Sub Category</Label>
          <Input value={formData.subCategory} onChange={(e) => setFormData({...formData, subCategory: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Image URL</Label>
          <Input value={formData.imageUrl} onChange={(e) => setFormData({...formData, imageUrl: e.target.value})} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Tags (comma separated)</Label>
        <Input 
          placeholder="e.g. React, UI/UX, Design" 
          value={formData.tags.join(", ")} 
          onChange={handleTagsChange}
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
      </div>
      <div className="space-y-2">
        <Label>Project Link (Visit Project URL)</Label>
        <Input value={formData.projectUrl} onChange={(e) => setFormData({...formData, projectUrl: e.target.value})} />
      </div>
      <div className="flex items-center justify-between p-4 bg-background border rounded-lg">
        <Label>Show "View Project" Link</Label>
        <Switch checked={formData.showViewLink} onCheckedChange={(checked) => setFormData({...formData, showViewLink: checked})} />
      </div>
      <Button 
        className="w-full bg-primary text-white" 
        onClick={() => onSave(formData)}
        disabled={isProcessing}
      >
        {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
        Save Project
      </Button>
    </div>
  );
}

function TestimonialForm({ initialData, onSave, isProcessing }: any) {
  const [formData, setFormData] = useState(initialData || { name: "", role: "", text: "", avatar: "" });
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Role</Label>
          <Input value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Avatar URL</Label>
        <Input value={formData.avatar} onChange={(e) => setFormData({...formData, avatar: e.target.value})} />
      </div>
      <div className="space-y-2">
        <Label>Testimonial Text</Label>
        <Textarea value={formData.text} onChange={(e) => setFormData({...formData, text: e.target.value})} />
      </div>
      <Button 
        className="w-full bg-primary text-white" 
        onClick={() => onSave(formData)}
        disabled={isProcessing}
      >
        {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
        Save Testimonial
      </Button>
    </div>
  );
}

function ExperienceForm({ initialData, onSave, isProcessing }: any) {
  const [formData, setFormData] = useState(initialData || { company: "", position: "", duration: "", description: "" });
  return (
    <div className="space-y-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Company</Label>
          <Input value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} />
        </div>
        <div className="space-y-2">
          <Label>Position</Label>
          <Input value={formData.position} onChange={(e) => setFormData({...formData, position: e.target.value})} />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Duration (e.g. 2021 - Present)</Label>
        <Input value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
      </div>
      <Button 
        className="w-full bg-primary text-white" 
        onClick={() => onSave(formData)}
        disabled={isProcessing}
      >
        {isProcessing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
        Save Experience
      </Button>
    </div>
  );
}