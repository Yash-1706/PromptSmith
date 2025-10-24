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
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-accent mb-4">
            Create New Prompt
          </h1>
          <p className="text-muted-foreground">
            Craft your AI prompt and test it with Gemini
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Prompt Details</CardTitle>
            <CardDescription>
              Fill in the details for your new prompt.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter prompt title"
                />
              </div>

              <div>
                <Label htmlFor="category">Category (Optional)</Label>
                <Input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Creative Writing, Code Generation"
                />
              </div>

              <div>
                <Label htmlFor="promptText">Prompt Text</Label>
                <Textarea
                  id="promptText"
                  name="promptText"
                  value={formData.promptText}
                  onChange={handleChange}
                  required
                  rows={8}
                  placeholder="Write your AI prompt here..."
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Prompt"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
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
