import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPrompt } from '../api/promptAPI';

const PromptEditor = () => {
  const [formData, setFormData] = useState({
    title: '',
    promptText: '',
    category: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createPrompt(formData);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating prompt:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-purple-400 mb-4">Create New Prompt</h1>
          <p className="text-gray-400">Craft your AI prompt and test it with Gemini</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter prompt title"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                Category (Optional)
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Creative Writing, Code Generation"
              />
            </div>

            <div>
              <label htmlFor="promptText" className="block text-sm font-medium text-gray-300 mb-2">
                Prompt Text
              </label>
              <textarea
                id="promptText"
                name="promptText"
                value={formData.promptText}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-vertical"
                placeholder="Write your AI prompt here..."
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-medium py-2 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {isLoading ? 'Creating...' : 'Create Prompt'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PromptEditor;