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
        <CardTitle className="text-accent">Version History</CardTitle>
      </CardHeader>
      <CardContent>
        {versions && versions.length > 0 ? (
          <div className="space-y-4">
            {versions.map((version, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      Version {versions.length - index}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(version.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-3">
                    <h4 className="text-sm font-medium text-foreground mb-1">
                      Prompt:
                    </h4>
                    <p className="text-muted-foreground text-sm whitespace-pre-wrap bg-card p-2 rounded">
                      {version.promptText}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-1">
                      AI Response:
                    </h4>
                    <p className="text-muted-foreground text-sm whitespace-pre-wrap bg-card p-2 rounded">
                      {version.aiResponse}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No version history available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default VersionHistory;
