import { Link } from "react-router-dom";

const PromptCard = ({ prompt }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-700">
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
  );
};

export default PromptCard;
