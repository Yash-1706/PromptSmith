import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPrompt } from "../api/promptAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PromptEditor = () => {
  const [formData, setFormData] = useState({
    title: "",
    promptText: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createPrompt(formData);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error creating prompt:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Liquid glass background layers */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-slate-900/50 to-black"></div>

      {/* Liquid shimmer overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent animate-pulse"></div>

      <div className="max-w-4xl mx-auto px-4 py-8 relative z-10">
        <div className="mb-12 slide-in-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-linear-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <h1 className="text-5xl font-bold gradient-text mb-2">
                Create New Prompt
              </h1>
              <p className="text-muted-foreground text-xl">
                Craft your AI prompt and test it with Gemini ✨
              </p>
            </div>
          </div>
        </div>

        <Card className="bounce-in shadow-2xl border-border/50 glass">
          <CardHeader className="pb-6">
            <CardTitle className="text-primary text-2xl">
              Prompt Details
            </CardTitle>
            <CardDescription className="text-muted-foreground text-lg">
              Fill in the details for your new prompt. Let's make something
              amazing! 🚀
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="slide-in-right space-y-3">
                <Label
                  htmlFor="title"
                  className="text-sm font-semibold text-foreground"
                >
                  Title
                </Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter prompt title"
                  className="transition-all duration-300 text-lg"
                />
              </div>

              <div className="slide-in-left space-y-3">
                <Label
                  htmlFor="category"
                  className="text-sm font-semibold text-foreground"
                >
                  Category (Optional)
                </Label>
                <Input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Creative Writing, Code Generation"
                  className="transition-all duration-300 text-lg"
                />
              </div>

              <div className="slide-in-right space-y-3">
                <Label
                  htmlFor="promptText"
                  className="text-sm font-semibold text-foreground"
                >
                  Prompt Text
                </Label>
                <Textarea
                  id="promptText"
                  name="promptText"
                  value={formData.promptText}
                  onChange={handleChange}
                  required
                  rows={10}
                  placeholder="Write your AI prompt here..."
                  className="transition-all duration-300 text-lg leading-relaxed"
                />
              </div>

              <div className="flex justify-center gap-6 slide-in-left pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="rainbow-border transition-all duration-300 text-lg px-8 py-3 max-w-xs"
                >
                  {isLoading ? "Creating..." : "Create Prompt"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                  className="hover:bg-muted/50 transition-all duration-300 text-lg px-8 py-3 max-w-xs"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PromptEditor;
