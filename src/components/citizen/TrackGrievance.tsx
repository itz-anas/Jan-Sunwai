import { useState } from "react";
import { Search, Clock, MapPin, Tag, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useGrievances } from "@/context/GrievanceContext";
import { Grievance, GrievanceStatus } from "@/types/grievance";
import { format } from "date-fns";


const statusConfig: Record<GrievanceStatus, { color: string; bgColor: string; label: string }> = {
  Pending: { color: "text-warning", bgColor: "bg-warning/10", label: "Pending Review" },
  "In Progress": { color: "text-info", bgColor: "bg-info/10", label: "Being Addressed" },
  Resolved: { color: "text-success", bgColor: "bg-success/10", label: "Resolved" },
  Rejected: { color: "text-destructive", bgColor: "bg-destructive/10", label: "Rejected" },
};


export function TrackGrievance() {
  const [ticketNumber, setTicketNumber] = useState("");
  const [searchResult, setSearchResult] = useState<Grievance | null | undefined>(undefined);
  const { getGrievanceByTicket } = useGrievances();


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketNumber.trim()) return;
    const result = getGrievanceByTicket(ticketNumber.trim().toUpperCase());
    setSearchResult(result ?? null);
  };


  return (
    <Card className="shadow-card animate-fade-up stagger-1">
      <CardHeader>
        <CardTitle className="font-display text-xl">Track Your Complaint</CardTitle>
        <CardDescription>
          Enter your ticket number to check the current status of your grievance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex gap-3">
          <Input
            placeholder="Enter Ticket Number (e.g., JS250101)"
            value={ticketNumber}
            onChange={(e) => setTicketNumber(e.target.value.toUpperCase())}
            className="h-11 font-mono"
          />
          <Button type="submit" className="h-11 px-6">
            <Search className="w-4 h-4 mr-2" />
            Track
          </Button>
        </form>


        {searchResult === null && (
          <div className="mt-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Ticket Not Found</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Please check the ticket number and try again.
            </p>
          </div>
        )}


        {searchResult && (
          <div className="mt-6 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <p className="text-xs text-muted-foreground">Ticket Number</p>
                <p className="font-display font-bold text-lg text-primary">
                  {searchResult.ticketNumber}
                </p>
              </div>
              <div className={`px-3 py-1.5 rounded-full ${statusConfig[searchResult.status].bgColor}`}>
                <span className={`text-sm font-medium ${statusConfig[searchResult.status].color}`}>
                  {statusConfig[searchResult.status].label}
                </span>
              </div>
            </div>


            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Tag className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-medium">{searchResult.category}</p>
                </div>
              </div>


              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="font-medium">{searchResult.location}</p>
                </div>
              </div>


              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-muted-foreground mt-1" />
                <div>
                  <p className="text-xs text-muted-foreground">Submitted On</p>
                  <p className="font-medium">{format(searchResult.createdAt, "PPP 'at' p")}</p>
                </div>
              </div>
            </div>


            {/* Title Display with proper text wrapping */}
            <div className="bg-muted rounded-lg p-3 mt-4">
              <p className="text-xs text-muted-foreground mb-1">Title</p>
              <p className="text-sm break-words overflow-wrap-anywhere">{searchResult.title}</p>
            </div>


            {/* Status Timeline */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Status Timeline</h4>
              <div className="relative pl-6 border-l-2 border-border space-y-4">
                <div className={`relative ${searchResult.status !== "Rejected" ? "opacity-100" : "opacity-50"}`}>
                  <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-primary" />
                  <p className="text-sm font-medium">Submitted</p>
                  <p className="text-xs text-muted-foreground">{format(searchResult.createdAt, "PPP")}</p>
                </div>
                {(searchResult.status === "In Progress" || searchResult.status === "Resolved") && (
                  <div className="relative">
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-info" />
                    <p className="text-sm font-medium">In Progress</p>
                    <p className="text-xs text-muted-foreground">Being addressed by concerned department</p>
                  </div>
                )}
                {searchResult.status === "Resolved" && (
                  <div className="relative">
                    <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-success" />
                    <p className="text-sm font-medium">Resolved</p>
                    <p className="text-xs text-muted-foreground">{format(searchResult.updatedAt, "PPP")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
