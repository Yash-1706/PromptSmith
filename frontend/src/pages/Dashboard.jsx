import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { getPrompts } from '../api/promptAPI';

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
      console.error('Error fetching prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400">Dashboard</h1>
          <Link
            to="/prompts/new"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Create New Prompt
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-400 text-lg mb-4">No prompts yet. Create your first prompt!</p>
              <Link
                to="/prompts/new"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
              >
                Get Started
              </Link>
            </div>
          ) : (
            prompts.map((prompt) => (
              <div key={prompt._id} className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-white mb-2">{prompt.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{prompt.promptText}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(prompt.createdAt).toLocaleDateString()}
                  </span>
                  <Link
                    to={`/prompts/${prompt._id}`}
                    className="text-purple-400 hover:text-purple-300 font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;