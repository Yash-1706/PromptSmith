import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AIOutput = ({ response, timestamp }) => {
  return (
    <Card className="glass border-border/50 shadow-2xl hover-lift">
      <CardHeader className="pb-6">
        <CardTitle className="text-accent text-2xl flex items-center gap-3">
          <div className="w-8 h-8 bg-linear-to-r from-accent to-secondary rounded-full flex items-center justify-center">
            <span className="text-sm">🤖</span>
          </div>
          AI Response
        </CardTitle>
        <CardDescription className="text-muted-foreground text-lg">
          Generated on {new Date(timestamp).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-accent/10 backdrop-blur-sm rounded-lg p-6 border border-accent/20 shadow-inner">
          <p className="text-foreground whitespace-pre-wrap leading-relaxed text-lg">
            {response}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIOutput;
