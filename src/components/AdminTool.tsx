
"use client";

import { useState } from "react";
import { refineContent } from "@/ai/flows/refine-content-flow";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2, Copy, Check, Settings, Save, X, List, Plus, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AdminToolProps {
  onClose: () => void;
}

export function AdminTool({ onClose }: AdminToolProps) {
  const [content, setContent] = useState("");
  const [type, setType] = useState("project description");
  const [refined, setRefined] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleRefine = async () => {
    if (!content) return;
    setLoading(true);
    try {
      const result = await refineContent({
        originalContent: content,
        contentType: type,
        targetAudience: "potential clients and recruiters",
      });
      setRefined(result.refinedContent);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refine content.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refined);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-6 overflow-y-auto">
      <Card className="max-w-4xl w-full border-primary/20 bg-card shadow-2xl relative">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl text-gradient">
            <Settings className="w-6 h-6 text-primary" />
            UdulaImanjith Administration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="projects" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-background/50 mb-6">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
              <TabsTrigger value="ai">AI Refiner</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="font-bold">Project List</h4>
                <Button size="sm" className="bg-primary text-white"><Plus className="w-4 h-4 mr-2" /> Add Project</Button>
              </div>
              <div className="space-y-4">
                {/* Mock Item Management */}
                {["Tech Flyer", "Dashboard", "UI Kit"].map(p => (
                  <div key={p} className="p-4 rounded-lg bg-background border flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-secondary rounded-md" />
                      <div>
                        <p className="font-bold">{p}</p>
                        <p className="text-xs text-muted-foreground">Graphic • Flyers</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label className="text-xs">Show Link</Label>
                        <Switch defaultChecked />
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive"><Trash className="w-4 h-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="font-bold">Testimonials</h4>
                <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2" /> Add New</Button>
              </div>
              <div className="p-12 text-center border-2 border-dashed rounded-xl">
                <p className="text-muted-foreground">No testimonials found. Add your first client review.</p>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Type</label>
                <Input value={type} onChange={(e) => setType(e.target.value)} className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Original Content</label>
                <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-[120px]" />
              </div>
              <Button onClick={handleRefine} disabled={loading || !content} className="w-full bg-primary text-white">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                Refine with AI
              </Button>
              {refined && (
                <div className="mt-4 p-4 rounded-lg bg-secondary text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">Refined Result:</span>
                    <Button variant="ghost" size="sm" onClick={copyToClipboard}><Copy className="w-4 h-4" /></Button>
                  </div>
                  {refined}
                </div>
              )}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <div className="p-4 bg-background rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Maintenance Mode</Label>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Cursor Trail</Label>
                  <Switch defaultChecked />
                </div>
              </div>
              <Button className="w-full bg-primary text-white"><Save className="w-4 h-4 mr-2" /> Save System Settings</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
