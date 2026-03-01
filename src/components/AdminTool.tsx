"use client";

import { useState } from "react";
import { refineContent } from "@/ai/flows/refine-content-flow";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sparkles, Loader2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function AdminTool() {
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
        description: "Failed to refine content. Please try again.",
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
    <section className="py-20 px-6 max-w-4xl mx-auto" id="admin-tool">
      <Card className="border-primary/20 bg-card/50 backdrop-blur">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline text-2xl text-gradient">
            <Sparkles className="w-6 h-6 text-primary" />
            AI Content Refiner
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Perfect your project descriptions and service offerings with AI.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Content Type</label>
            <Input 
              value={type} 
              onChange={(e) => setType(e.target.value)} 
              placeholder="e.g. project description, service offering"
              className="bg-background/50 border-border/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Original Content</label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your rough description here..."
              className="min-h-[120px] bg-background/50 border-border/50"
            />
          </div>
          <Button 
            onClick={handleRefine} 
            disabled={loading || !content}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
            Refine with AI
          </Button>

          {refined && (
            <div className="mt-8 space-y-2 animate-fade-in">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-primary">Refined Content</label>
                <Button variant="ghost" size="sm" onClick={copyToClipboard} className="text-muted-foreground hover:text-primary">
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border/50 text-sm leading-relaxed italic text-foreground">
                {refined}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}