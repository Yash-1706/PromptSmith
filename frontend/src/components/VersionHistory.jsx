import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VersionHistory = ({ versions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-purple-400">Version History</CardTitle>
      </CardHeader>
      <CardContent>
        {versions && versions.length > 0 ? (
          <div className="space-y-4">
            {versions.map((version, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-gray-400">
                      Version {versions.length - index}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(version.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-gray-300 mb-1">
                      Prompt:
                    </h4>
                    <p className="text-gray-400 text-sm whitespace-pre-wrap bg-gray-900 p-2 rounded">
                      {version.promptText}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-1">
                      AI Response:
                    </h4>
                    <p className="text-gray-400 text-sm whitespace-pre-wrap bg-gray-900 p-2 rounded">
                      {version.aiResponse}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No version history available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default VersionHistory;
