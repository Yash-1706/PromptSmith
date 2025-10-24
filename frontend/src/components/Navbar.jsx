import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300">
          PromptSmith
        </Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">Welcome, {user.username}</span>
              <Link 
                to="/dashboard" 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;