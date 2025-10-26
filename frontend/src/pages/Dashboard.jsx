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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Liquid glass background layers */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-slate-900/50 to-black"></div>

      {/* Liquid shimmer overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        <div className="flex justify-between items-center mb-12 slide-in-left">
          <div>
            <h1 className="text-5xl font-bold gradient-text mb-2">Dashboard</h1>
            <p className="text-muted-foreground text-xl">
              Manage your AI prompts with style
            </p>
          </div>
          <Button
            asChild
            className="rainbow-border transition-all duration-300 text-lg px-8 py-3"
          >
            <Link to="/prompts/new">Create New Prompt</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prompts.length === 0 ? (
            <div className="col-span-full text-center py-20 slide-in-right">
              <div className="mx-auto w-24 h-24 bg-linear-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">✨</span>
              </div>
              <p className="text-muted-foreground text-2xl mb-6">
                No prompts yet. Create your first masterpiece!
              </p>
              <Button asChild className="btn-pulse text-lg px-8 py-3">
                <Link to="/prompts/new">Get Started</Link>
              </Button>
            </div>
          ) : (
            prompts.map((prompt, index) => (
              <Card
                key={prompt._id}
                className="hover-lift slide-in-right glass border-border/60 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="pb-4">
                  <CardTitle className="text-primary text-xl group-hover:scale-105 transition-transform duration-300">
                    {prompt.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-muted-foreground leading-relaxed">
                    {prompt.promptText}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                      {new Date(prompt.createdAt).toLocaleDateString()}
                    </span>
                    <Button
                      variant="ghost"
                      asChild
                      className="hover:text-accent transition-all duration-300 hover:scale-110"
                    >
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
