import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import ResponseDisplay from "./ResponseDisplay";
import { Heart, Sparkles, Loader2 } from "lucide-react";

const BUTTON_TEXTS = [
  "I love you Anmol 💕",
  "Fill me up daddy Anmol 🔥"
];

const API_URL = import.meta.env.VITE_API_URL|| "https://gform-3zkm.onrender.com/fill-form/";

interface FormResponse {
  status: string;
  message: string;
  answers: Record<string, string>;
  validation_errors: boolean;
}

const FormFiller = () => {
  const [formUrl, setFormUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<FormResponse | null>(null);
  const [buttonTextIndex, setButtonTextIndex] = useState(() => Math.random() > 0.5 ? 0 : 1);

  // Rotate button text every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setButtonTextIndex(prev => (prev === 0 ? 1 : 0));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async () => {
    if (!formUrl.trim()) {
      toast({
        title: "Oops! 🌻",
        description: "Please enter a Google Form URL first!",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    if (!formUrl.includes("docs.google.com/forms")) {
      toast({
        title: "Invalid URL 😅",
        description: "Please enter a valid Google Forms URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form_url: formUrl,
          headless: true,
        }),
      });

      const data = await res.json();
      setResponse(data);

      if (data.status === "success") {
        toast({
          title: "Yay! Form Filled! 🎉",
          description: "Form filled successfully. Check the response below.",
        });
      } else {
        toast({
          title: "Something went wrong 😢",
          description: data.message || "Please try again",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Connection Error 🔌",
        description: "Could not reach the server. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <Card className="border-2 border-border bg-card/90 backdrop-blur-md shadow-card">
        <CardHeader className="text-center pb-2">
          <CardTitle className="font-display text-3xl md:text-4xl text-foreground flex items-center justify-center gap-3">
            
            Diya's Form Filler
            <Heart className="w-8 h-8 text-secondary animate-pulse" />
          </CardTitle>
          <p className="text-muted-foreground font-body mt-2">
            Paste your Google Form URL
          </p>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="space-y-2">
            <label htmlFor="formUrl" className="font-display text-sm font-medium text-foreground">
              Google Form URL
            </label>
            <Input
              id="formUrl"
              type="url"
              placeholder="https://docs.google.com/forms/d/e/..."
              value={formUrl}
              onChange={(e) => setFormUrl(e.target.value)}
              disabled={isLoading}
              className="text-base"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            variant={buttonTextIndex === 0 ? "love" : "fun"}
            size="xl"
            className="w-full animate-pulse-glow"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Working on it...
              </>
            ) : (
              BUTTON_TEXTS[buttonTextIndex]
            )}
          </Button>
        </CardContent>
      </Card>

      <ResponseDisplay response={response} />
    </div>
  );
};

export default FormFiller;
