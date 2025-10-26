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

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { register, isLoading, error, clearError } = useAuthStore();
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
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch
      return;
    }
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      navigate("/dashboard");
    } catch (error) {
      // Error is handled in store
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 relative overflow-hidden">
      {/* Liquid glass background layers */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-slate-900/50 to-black"></div>

      {/* Liquid shimmer overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent animate-pulse"></div>

      <Card className="max-w-md w-full bounce-in shadow-xl border-border/60 glass relative z-10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-linear-to-r from-secondary/20 to-accent/20 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">🌟</span>
          </div>
          <CardTitle className="text-3xl font-bold gradient-text mb-2">
            Join PromptSmith
          </CardTitle>
          <CardDescription className="text-muted-foreground text-lg">
            Create your account and start crafting amazing AI prompts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="bg-destructive/10 backdrop-blur-sm text-destructive border border-destructive/30 p-4 rounded-lg animate-pulse shadow-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="slide-in-left space-y-2">
              <Label htmlFor="username" className="text-sm font-semibold">
                Username
              </Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
                className="transition-all duration-300"
              />
            </div>

            <div className="slide-in-right space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="transition-all duration-300"
              />
            </div>

            <div className="slide-in-left space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a password"
                className="transition-all duration-300"
              />
            </div>

            <div className="slide-in-right space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-semibold"
              >
                Confirm Password
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
                className="transition-all duration-300"
              />
            </div>

            <div className="flex justify-center pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="rainbow-border transition-all duration-300 text-lg py-3 px-8 w-full max-w-xs"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </form>

          <div className="text-center pt-4">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-secondary hover:text-secondary/80 font-semibold hover:underline transition-all duration-300"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
