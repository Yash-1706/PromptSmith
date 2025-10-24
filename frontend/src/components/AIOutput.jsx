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
        <CardTitle className="text-purple-400">AI Response</CardTitle>
        <CardDescription>
          {new Date(timestamp).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-900 rounded p-4">
          <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
            {response}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIOutput;
