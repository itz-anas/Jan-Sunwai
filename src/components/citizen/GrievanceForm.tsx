import { useState } from "react";
import { Send, CheckCircle2, AlertCircle, MapPin, User, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useGrievances } from "@/context/GrievanceContext";
import { Grievance } from "@/types/grievance";


export function GrievanceForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [citizenName, setCitizenName] = useState("");
  const [citizenPhone, setCitizenPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedGrievance, setSubmittedGrievance] = useState<Grievance | null>(null);
  
  const { addGrievance } = useGrievances();
  const { toast } = useToast();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim() || !citizenName.trim() || !citizenPhone.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }


    if (description.trim().length < 20) {
      toast({
        title: "Description Too Short",
        description: "Please provide more details about your grievance (at least 20 characters).",
        variant: "destructive",
      });
      return;
    }


    setIsSubmitting(true);

    try {
      const newGrievance = await addGrievance(title, description, citizenName, citizenPhone);
      setSubmittedGrievance(newGrievance);
      setIsSubmitting(false);

      toast({
        title: "Grievance Submitted Successfully!",
        description: `Your ticket number is ${newGrievance.ticketNumber}`,
      });
    } catch (err) {
      setIsSubmitting(false);
      toast({
        title: "Error Submitting Grievance",
        description: err instanceof Error ? err.message : "Please try again later.",
        variant: "destructive",
      });
    }
  };


  const handleReset = () => {
    setTitle("");
    setDescription("");
    setCitizenName("");
    setCitizenPhone("");
    setSubmittedGrievance(null);
  };


  if (submittedGrievance) {
    return (
      <Card className="shadow-card animate-scale-in border-success/30">
        <CardContent className="pt-8 pb-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full gradient-success flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-success-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground">
                Grievance Registered Successfully!
              </h3>
              <p className="text-muted-foreground mt-1">
                Your complaint has been received and is being processed.
              </p>
            </div>
            
            <div className="bg-secondary rounded-lg p-4 mt-6 space-y-3">
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-muted-foreground text-sm">Ticket Number</span>
                <span className="font-display font-bold text-lg text-primary">
                  {submittedGrievance.ticketNumber}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-muted-foreground text-sm">Category</span>
                <span className="font-medium text-foreground">
                  {submittedGrievance.category}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-border pb-2">
                <span className="text-muted-foreground text-sm">Priority</span>
                <span className={`font-medium ${
                  submittedGrievance.priority === "High" 
                    ? "text-destructive" 
                    : submittedGrievance.priority === "Medium" 
                    ? "text-warning" 
                    : "text-success"
                }`}>
                  {submittedGrievance.priority}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Detected Location</span>
                <span className="font-medium text-foreground flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {submittedGrievance.location}
                </span>
              </div>
            </div>


            <div className="bg-info/10 border border-info/30 rounded-lg p-3 mt-4">
              <p className="text-sm text-info flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                Save your ticket number to track the status of your complaint.
              </p>
            </div>


            <Button onClick={handleReset} className="mt-6">
              Submit Another Grievance
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }


  return (
    <Card className="shadow-card animate-fade-up">
      <CardHeader>
        <CardTitle className="font-display text-xl">Submit Your Grievance</CardTitle>
        <CardDescription>
          Describe your issue in detail. Our AI will automatically categorize and prioritize it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={citizenName}
                onChange={(e) => setCitizenName(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your mobile number"
                value={citizenPhone}
                onChange={(e) => setCitizenPhone(e.target.value)}
                className="h-11"
              />
            </div>
          </div>

          {/* Title Field */}
          <div className="space-y-2">
            <Label htmlFor="title" className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              Grievance Title *
            </Label>
            <Input
              id="title"
              placeholder="Enter a brief title for your grievance"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Describe Your Issue *</Label>
            <Textarea
              id="description"
              placeholder="Please describe your grievance in detail. Include specific location, dates, and any other relevant information that can help us address your concern effectively..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Minimum 20 characters. Current: {description.length}
            </p>
          </div>


          <div className="bg-muted rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-2">AI-Powered Processing</h4>
            <p className="text-xs text-muted-foreground">
              Our system will automatically detect the category, priority, and location from your description 
              to ensure your complaint reaches the right department quickly.
            </p>
          </div>


          <Button 
            type="submit" 
            className="w-full h-12 text-base font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Analyzing & Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Grievance
              </span>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
