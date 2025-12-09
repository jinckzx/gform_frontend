import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";

interface ResponseDisplayProps {
  response: {
    status: string;
    message: string;
    answers: Record<string, string>;
    validation_errors: boolean;
  } | null;
}

const ResponseDisplay = ({ response }: ResponseDisplayProps) => {
  if (!response) return null;

  const isSuccess = response.status === "success";

  return (
    <Card className="mt-8 border-2 border-border bg-card/80 backdrop-blur-sm shadow-card overflow-hidden">
      <CardHeader className={`${isSuccess ? 'bg-sunflower-100' : 'bg-destructive/10'} pb-4`}>
        <CardTitle className="flex items-center gap-3 font-display text-xl">
          {isSuccess ? (
            <CheckCircle className="w-6 h-6 text-sunflower-600" />
          ) : (
            <XCircle className="w-6 h-6 text-destructive" />
          )}
          <span className={isSuccess ? 'text-sunflower-700' : 'text-destructive'}>
            {response.message}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <h4 className="font-display text-lg mb-4 text-muted-foreground">Answers Submitted:</h4>
        <div className="grid gap-3 max-h-80 overflow-y-auto pr-2">
          {Object.entries(response.answers).map(([key, value]) => (
            <div
              key={key}
              className="flex gap-3 p-3 bg-muted/50 rounded-lg"
            >
              <span className="font-bold text-primary min-w-[2rem]">Q{key}:</span>
              <span className="text-foreground font-medium">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResponseDisplay;
