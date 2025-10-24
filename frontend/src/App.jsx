import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PromptDetails from './pages/PromptDetails';
import PromptEditor from './components/PromptEditor';
import useAuthStore from './store/useAuthStore';
import { useEffect } from 'react';

const queryClient = new QueryClient();

function App() {
  const { user, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/prompts/new" element={user ? <PromptEditor /> : <Navigate to="/login" />} />
            <Route path="/prompts/:id" element={user ? <PromptDetails /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
