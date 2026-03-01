
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
  Eye, 
  EyeOff, 
  Edit 
} from "lucide-react";
import { useCollection } from "@/firebase";
import { useFirestore } from "@/firebase";
import { collection, doc, addDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface AdminToolProps {
  onClose: () => void;
}

export function AdminTool({ onClose }: AdminToolProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const db = useFirestore();
  const { toast } = useToast();

  const projectsRef = db ? collection(db, "projects") : null;
  const { data: projects = [] } = useCollection(projectsRef ? projectsRef : null);

  const testimonialsRef = db ? collection(db, "testimonials") : null;
  const { data: testimonials = [] } = useCollection(testimonialsRef ? testimonialsRef : null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { // Prototype simple password
      setIsAuthenticated(true);
    } else {
      toast({ title: "Error", description: "Incorrect password", variant: "destructive" });
    }
  };

  const handleUpdateProject = (id: string, data: any) => {
    if (!db) return;
    updateDoc(doc(db, "projects", id), data);
  };

  const handleDeleteProject = (id: string) => {
    if (!db) return;
    deleteDoc(doc(db, "projects", id));
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-[200] flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-primary/20 bg-card">
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
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-6 overflow-y-auto">
      <Card className="max-w-5xl w-full border-primary/20 bg-card shadow-2xl relative h-[80vh] flex flex-col">
        <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl text-gradient">
            <Settings className="w-6 h-6 text-primary" />
            Control Center
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
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
                  <DialogContent className="max-w-2xl bg-card border-border">
                    <DialogHeader><DialogTitle>Create New Project</DialogTitle></DialogHeader>
                    <ProjectForm onSave={(data) => db && projectsRef && addDoc(projectsRef, data)} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((p: any) => (
                  <div key={p.id} className="p-4 rounded-xl bg-background border flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <img src={p.imageUrl} className="w-12 h-12 rounded object-cover border" alt="" />
                      <div>
                        <p className="font-bold text-sm leading-tight">{p.title}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{p.category} • {p.subCategory}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl bg-card border-border">
                          <DialogHeader><DialogTitle>Edit Project</DialogTitle></DialogHeader>
                          <ProjectForm 
                            initialData={p} 
                            onSave={(data) => handleUpdateProject(p.id, data)} 
                          />
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteProject(p.id)}>
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold">Client Feedback</h4>
                <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2" /> Add Testimonial</Button>
              </div>
              <div className="p-12 text-center border-2 border-dashed rounded-xl">
                <p className="text-muted-foreground italic">Connect with testimonials collection...</p>
              </div>
            </TabsContent>

            <TabsContent value="experience" className="space-y-4">
              <h4 className="font-bold">Work History</h4>
              <div className="p-8 text-center border-2 border-dashed rounded-xl">
                <p className="text-muted-foreground italic">Add your professional milestones here.</p>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="p-6 bg-background rounded-xl border space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Maintenance Mode</Label>
                    <p className="text-xs text-muted-foreground">Show a temporary splash screen to visitors</p>
                  </div>
                  <Switch onCheckedChange={(checked) => db && setDoc(doc(db, "settings", "global"), { maintenanceMode: checked }, { merge: true })} />
                </div>
              </div>
              <Button className="w-full bg-primary text-white"><Save className="w-4 h-4 mr-2" /> Apply Global Changes</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function ProjectForm({ initialData, onSave }: { initialData?: any; onSave: (data: any) => void }) {
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
        <Label>Description</Label>
        <Textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
      </div>
      <div className="space-y-2">
        <Label>Project Link</Label>
        <Input value={formData.projectUrl} onChange={(e) => setFormData({...formData, projectUrl: e.target.value})} />
      </div>
      <div className="flex items-center justify-between p-4 bg-background border rounded-lg">
        <Label>Show "View Project" Link</Label>
        <Switch checked={formData.showViewLink} onCheckedChange={(checked) => setFormData({...formData, showViewLink: checked})} />
      </div>
      <Button className="w-full" onClick={() => onSave(formData)}>Save Project Details</Button>
    </div>
  );
}
