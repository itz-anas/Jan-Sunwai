import { GrievanceForm } from "./GrievanceForm";
import { TrackGrievance } from "./TrackGrievance";
import { FileText, Search } from "lucide-react";


export function CitizenPortal() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8 animate-fade-up">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Citizen Service Portal
        </h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Submit your grievances and track their resolution. Our AI-powered system ensures your 
          complaint reaches the right department for faster resolution.
        </p>
      </div>


      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-card rounded-lg p-5 shadow-card border border-border animate-fade-up stagger-1">
          <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center mb-3">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <h3 className="font-display font-semibold text-foreground">Submit Complaint</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Describe your issue and get an instant ticket number
          </p>
        </div>
        <div className="bg-card rounded-lg p-5 shadow-card border border-border animate-fade-up stagger-2">
          <div className="w-10 h-10 rounded-lg gradient-success flex items-center justify-center mb-3">
            <svg className="w-5 h-5 text-success-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2a10 10 0 1 0 10 10" />
              <path d="M12 12l4-4" />
              <path d="M22 2 12 12" />
            </svg>
          </div>
          <h3 className="font-display font-semibold text-foreground">AI Classification</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Auto-detection of category, priority & location
          </p>
        </div>
        <div className="bg-card rounded-lg p-5 shadow-card border border-border animate-fade-up stagger-3">
          <div className="w-10 h-10 rounded-lg gradient-warning flex items-center justify-center mb-3">
            <Search className="w-5 h-5 text-warning-foreground" />
          </div>
          <h3 className="font-display font-semibold text-foreground">Track Status</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time updates on your complaint progress
          </p>
        </div>
      </div>


      <div className="grid lg:grid-cols-2 gap-6">
        <GrievanceForm />
        <TrackGrievance />
      </div>
    </div>
  );
}
