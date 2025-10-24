import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/dashboard");
    } catch (error) {
      // Error is handled in store
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full bounce-in shadow-lg border-2 border-accent/10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold gradient-text mb-2">
            Login to PromptSmith
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Welcome back! Let's create some amazing prompts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/10 text-destructive border border-destructive/20 p-3 rounded-md mb-4 animate-pulse">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="slide-in-left">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="hover:border-accent/30 transition-colors focus:border-accent"
              />
            </div>

            <div className="slide-in-right">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="hover:border-accent/30 transition-colors focus:border-accent"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rainbow-border transition-transform hover:scale-102"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-accent hover:text-accent/80 font-semibold hover:underline transition-all"
            >
              Register here
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
