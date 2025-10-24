import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AIOutput = ({ response, timestamp }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-accent">AI Response</CardTitle>
        <CardDescription>
          {new Date(timestamp).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-card rounded p-4">
          <p className="text-foreground whitespace-pre-wrap leading-relaxed">
            {response}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIOutput;
