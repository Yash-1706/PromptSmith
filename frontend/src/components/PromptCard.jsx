import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PromptCard = ({ prompt }) => {
  return (
    <Card className="hover:shadow-xl transition-shadow">
      <CardHeader>
        <CardTitle>{prompt.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {prompt.promptText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {new Date(prompt.createdAt).toLocaleDateString()}
          </span>
          <Button variant="link" asChild>
            <Link to={`/prompts/${prompt._id}`}>View Details →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptCard;
