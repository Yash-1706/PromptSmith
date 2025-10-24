const AIOutput = ({ response, timestamp }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-purple-400">AI Response</h3>
        <span className="text-sm text-gray-500">
          {new Date(timestamp).toLocaleString()}
        </span>
      </div>
      <div className="bg-gray-900 rounded p-4">
        <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{response}</p>
      </div>
    </div>
  );
};

export default AIOutput;