import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { getPrompts } from "../api/promptAPI";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
  const { user, loadUser } = useAuthStore();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
    fetchPrompts();
  }, []);

  const fetchPrompts = async () => {
    try {
      const data = await getPrompts();
      setPrompts(data);
    } catch (error) {
      console.error("Error fetching prompts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-foreground text-xl bounce-in">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animated-bg text-foreground">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 slide-in-left">
          <h1 className="text-4xl font-bold gradient-text">Dashboard</h1>
          <Button asChild className="rainbow-border hover:scale-105 transition-transform">
            <Link to="/prompts/new">Create New Prompt</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.length === 0 ? (
            <div className="col-span-full text-center py-12 slide-in-right">
              <p className="text-muted-foreground text-lg mb-4">
                No prompts yet. Create your first prompt!
              </p>
              <Button asChild className="btn-pulse">
                <Link to="/prompts/new">Get Started</Link>
              </Button>
            </div>
          ) : (
            prompts.map((prompt, index) => (
              <Card
                key={prompt._id}
                className="hover-lift slide-in-right"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-primary">{prompt.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {prompt.promptText}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {new Date(prompt.createdAt).toLocaleDateString()}
                    </span>
                    <Button variant="link" asChild className="hover:text-accent transition-colors">
                      <Link to={`/prompts/${prompt._id}`}>View Details →</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
