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
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border px-4 py-3 shadow-lg bounce-in">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold gradient-text hover:scale-110 transition-transform duration-300 float"
        >
          PromptSmith
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-muted-foreground font-medium">
                Welcome, {user.username}
              </span>
              <Button asChild variant="ghost" className="hover:bg-accent/20 transition-colors">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button onClick={handleLogout} variant="destructive" className="hover:scale-105 transition-transform">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" className="hover:bg-accent/20 transition-colors">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="rainbow-border hover:scale-105 transition-transform">
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
