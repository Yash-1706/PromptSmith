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
    <Card className="hover-lift border-border/50 glass group transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-primary text-xl group-hover:scale-105 transition-transform duration-300">
          {prompt.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-muted-foreground leading-relaxed">
          {prompt.promptText}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
            {new Date(prompt.createdAt).toLocaleDateString()}
          </span>
          <Button
            variant="ghost"
            asChild
            className="hover:text-accent transition-all duration-300 hover:scale-110"
          >
            <Link to={`/prompts/${prompt._id}`}>View Details →</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptCard;
