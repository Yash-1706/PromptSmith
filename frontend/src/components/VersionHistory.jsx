import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VersionHistory = ({ versions }) => {
  return (
    <Card className="glass border-border/50 shadow-2xl">
      <CardHeader className="pb-6">
        <CardTitle className="text-accent text-2xl">Version History</CardTitle>
        <CardDescription className="text-muted-foreground">
          Track changes and improvements to your prompt over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        {versions && versions.length > 0 ? (
          <div className="space-y-6">
            {versions.map((version, index) => (
              <Card key={index} className="glass border-border/30 hover-lift">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      Version {versions.length - index}
                    </span>
                    <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                      {new Date(version.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Prompt:
                    </h4>
                    <div className="bg-input/50 backdrop-blur-sm p-4 rounded-lg border border-border/30">
                      <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">
                        {version.promptText}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary rounded-full"></span>
                      AI Response:
                    </h4>
                    <div className="bg-accent/10 backdrop-blur-sm p-4 rounded-lg border border-accent/20">
                      <p className="text-muted-foreground text-sm whitespace-pre-wrap leading-relaxed">
                        {version.aiResponse}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-linear-to-r from-accent/20 to-secondary/20 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📜</span>
            </div>
            <p className="text-muted-foreground text-lg">
              No version history available yet
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VersionHistory;
