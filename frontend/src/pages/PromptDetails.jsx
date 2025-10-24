import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPrompt, updatePrompt, deletePrompt } from '../api/promptAPI';
import { testPrompt, refinePrompt, evaluatePrompt } from '../api/aiAPI';

const PromptDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ title: '', promptText: '', category: '' });

  useEffect(() => {
    fetchPrompt();
  }, [id]);

  const fetchPrompt = async () => {
    try {
      const data = await getPrompt(id);
      setPrompt(data);
      setEditData({
        title: data.title,
        promptText: data.promptText,
        category: data.category,
      });
    } catch (error) {
      console.error('Error fetching prompt:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTestPrompt = async () => {
    setIsTesting(true);
    try {
      const response = await testPrompt({ promptId: id, promptText: prompt.promptText });
      setAiResponse(response.aiResponse);
      // Refresh prompt to get updated responses
      fetchPrompt();
    } catch (error) {
      console.error('Error testing prompt:', error);
    } finally {
      setIsTesting(false);
    }
  };

  const handleUpdatePrompt = async () => {
    try {
      await updatePrompt(id, editData);
      setIsEditing(false);
      fetchPrompt();
    } catch (error) {
      console.error('Error updating prompt:', error);
    }
  };

  const handleDeletePrompt = async () => {
    if (window.confirm('Are you sure you want to delete this prompt?')) {
      try {
        await deletePrompt(id);
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting prompt:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Prompt not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-purple-400 hover:text-purple-300 mb-4 inline-block"
          >
            ← Back to Dashboard
          </button>
          <div className="flex justify-between items-start">
            {isEditing ? (
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                className="text-4xl font-bold bg-gray-800 border border-gray-600 rounded px-2 py-1 text-purple-400"
              />
            ) : (
              <h1 className="text-4xl font-bold text-purple-400">{prompt.title}</h1>
            )}
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleUpdatePrompt}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDeletePrompt}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Prompt</h2>
            {isEditing ? (
              <textarea
                value={editData.promptText}
                onChange={(e) => setEditData({ ...editData, promptText: e.target.value })}
                className="w-full h-64 bg-gray-700 border border-gray-600 rounded p-3 text-white"
              />
            ) : (
              <p className="text-gray-300 whitespace-pre-wrap">{prompt.promptText}</p>
            )}
            <button
              onClick={handleTestPrompt}
              disabled={isTesting}
              className="mt-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-6 py-2 rounded font-medium"
            >
              {isTesting ? 'Testing...' : 'Test with Gemini'}
            </button>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">AI Response</h2>
            {aiResponse ? (
              <div className="bg-gray-700 rounded p-4">
                <p className="text-gray-300 whitespace-pre-wrap">{aiResponse}</p>
              </div>
            ) : (
              <p className="text-gray-500">Click "Test with Gemini" to get an AI response</p>
            )}
          </div>
        </div>

        {prompt.aiResponses && prompt.aiResponses.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Response History</h2>
            <div className="space-y-4">
              {prompt.aiResponses.map((response, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <p className="text-gray-300 whitespace-pre-wrap">{response.responseText}</p>
                  <span className="text-sm text-gray-500">
                    {new Date(response.createdAt).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromptDetails;