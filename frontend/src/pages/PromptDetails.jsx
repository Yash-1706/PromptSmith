import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPrompt, updatePrompt, deletePrompt } from "../api/promptAPI";
import { testPrompt, refinePrompt, evaluatePrompt } from "../api/aiAPI";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PromptDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState("");
  const [isTesting, setIsTesting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    promptText: "",
    category: "",
  });

  useEffect(() => {
    fetchPrompt();
  }, [id]);

  const fetchPrompt = async () => {
    try {
      const data = await getPrompt(id);
      setPrompt(data);
      setEditData({
        title: data.title,
        promptText: data.promptText,
        category: data.category,
      });
    } catch (error) {
      console.error("Error fetching prompt:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTestPrompt = async () => {
    setIsTesting(true);
    try {
      const response = await testPrompt({
        promptId: id,
        promptText: prompt.promptText,
      });
      setAiResponse(response.aiResponse);
      // Refresh prompt to get updated responses
      fetchPrompt();
    } catch (error) {
      console.error("Error testing prompt:", error);
    } finally {
      setIsTesting(false);
    }
  };

  const handleUpdatePrompt = async () => {
    try {
      await updatePrompt(id, editData);
      setIsEditing(false);
      fetchPrompt();
    } catch (error) {
      console.error("Error updating prompt:", error);
    }
  };

  const handleDeletePrompt = async () => {
    if (window.confirm("Are you sure you want to delete this prompt?")) {
      try {
        await deletePrompt(id);
        navigate("/dashboard");
      } catch (error) {
        console.error("Error deleting prompt:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl bounce-in">Loading...</div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl">Prompt not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Liquid glass background layers */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-slate-900/50 to-black"></div>

      {/* Liquid shimmer overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-4 py-8 relative z-10">
        <div className="mb-12 slide-in-left">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 hover:bg-accent/20 transition-all duration-300 hover:scale-105"
          >
            ← Back to Dashboard
          </Button>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-5xl font-bold gradient-text mb-2">
                {prompt.title}
              </h1>
              <p className="text-muted-foreground text-xl">
                Explore and test your AI prompt
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rainbow-border transition-all duration-300 text-lg px-6 py-3 max-w-xs">
                    Edit Prompt
                  </Button>
                </DialogTrigger>
                <DialogContent className="bounce-in glass border-border/50">
                  <DialogHeader>
                    <DialogTitle className="gradient-text text-2xl">
                      Edit Prompt
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground text-lg">
                      Make changes to your prompt here. Let's improve it! ✨
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-title"
                        className="text-sm font-semibold"
                      >
                        Title
                      </Label>
                      <Input
                        id="edit-title"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                        className="transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-category"
                        className="text-sm font-semibold"
                      >
                        Category
                      </Label>
                      <Input
                        id="edit-category"
                        value={editData.category}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                        className="transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="edit-prompt"
                        className="text-sm font-semibold"
                      >
                        Prompt Text
                      </Label>
                      <Textarea
                        id="edit-prompt"
                        value={editData.promptText}
                        onChange={(e) =>
                          setEditData({
                            ...editData,
                            promptText: e.target.value,
                          })
                        }
                        rows={8}
                        className="transition-all duration-300"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={handleUpdatePrompt}
                      className="rainbow-border transition-all duration-300 text-lg px-6 py-3 max-w-xs"
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant="destructive"
                onClick={handleDeletePrompt}
                className="transition-all duration-300 text-lg px-6 py-3 max-w-xs"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="slide-in-left shadow-2xl border-border/50 glass">
            <CardHeader className="pb-6">
              <CardTitle className="text-primary text-2xl">
                Your Prompt
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                The prompt text that will be sent to the AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-input/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-border/50">
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                  {prompt.promptText}
                </p>
              </div>
              <Button
                onClick={handleTestPrompt}
                disabled={isTesting}
                className="rainbow-border transition-all duration-300 text-lg px-8 py-3 w-full"
              >
                {isTesting ? "Testing with Gemini..." : "🚀 Test with Gemini"}
              </Button>
            </CardContent>
          </Card>

          <Card className="slide-in-right shadow-2xl border-border/50 glass">
            <CardHeader className="pb-6">
              <CardTitle className="text-secondary text-2xl">
                AI Response
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                The latest response from Gemini AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              {aiResponse ? (
                <div className="bg-accent/10 backdrop-blur-sm rounded-lg p-6 border border-accent/30 shadow-inner">
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                    {aiResponse}
                  </p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-linear-to-r from-secondary/20 to-accent/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">🤖</span>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    Click "Test with Gemini" to get an AI response ✨
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {prompt.aiResponses && prompt.aiResponses.length > 0 && (
          <div className="mt-12 slide-in-left">
            <h2 className="text-3xl font-semibold mb-8 gradient-text">
              Response History
            </h2>
            <div className="space-y-6">
              {prompt.aiResponses.map((response, index) => (
                <Card
                  key={index}
                  className="hover-lift glass border-border/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="bg-input/30 backdrop-blur-sm rounded-lg p-6 border border-border/30">
                      <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {response.responseText}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className="text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full">
                        {new Date(response.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptDetails;
