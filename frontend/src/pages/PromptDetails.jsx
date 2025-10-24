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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Prompt not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="link"
            onClick={() => navigate("/dashboard")}
            className="mb-4"
          >
            ← Back to Dashboard
          </Button>
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold text-purple-400">
              {prompt.title}
            </h1>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Edit</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Prompt</DialogTitle>
                    <DialogDescription>
                      Make changes to your prompt here.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="edit-title">Title</Label>
                      <Input
                        id="edit-title"
                        value={editData.title}
                        onChange={(e) =>
                          setEditData({ ...editData, title: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-category">Category</Label>
                      <Input
                        id="edit-category"
                        value={editData.category}
                        onChange={(e) =>
                          setEditData({ ...editData, category: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-prompt">Prompt Text</Label>
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
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleUpdatePrompt}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="destructive" onClick={handleDeletePrompt}>
                Delete
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 whitespace-pre-wrap">
                {prompt.promptText}
              </p>
              <Button
                onClick={handleTestPrompt}
                disabled={isTesting}
                className="mt-4"
              >
                {isTesting ? "Testing..." : "Test with Gemini"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Response</CardTitle>
            </CardHeader>
            <CardContent>
              {aiResponse ? (
                <div className="bg-gray-700 rounded p-4">
                  <p className="text-gray-300 whitespace-pre-wrap">
                    {aiResponse}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">
                  Click "Test with Gemini" to get an AI response
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {prompt.aiResponses && prompt.aiResponses.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Response History</h2>
            <div className="space-y-4">
              {prompt.aiResponses.map((response, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <p className="text-gray-300 whitespace-pre-wrap">
                      {response.responseText}
                    </p>
                    <span className="text-sm text-gray-500">
                      {new Date(response.createdAt).toLocaleString()}
                    </span>
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
