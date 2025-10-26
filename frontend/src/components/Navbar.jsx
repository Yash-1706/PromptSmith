import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-card/20 backdrop-blur-xl border-b border-border/30 px-6 py-4 shadow-2xl sticky top-0 z-50 overflow-hidden">
      {/* Liquid shimmer effect */}
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-liquid-shimmer"></div>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold gradient-text transition-all duration-300 float hover:scale-105"
        >
          PromptSmith
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-muted-foreground font-medium text-lg">
                Welcome, {user.username}
              </span>
              <Button
                asChild
                variant="ghost"
                className="hover:bg-accent/20 transition-all duration-300"
              >
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="transition-all duration-300"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="hover:bg-accent/20 transition-all duration-300"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="rainbow-border transition-all duration-300"
              >
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
