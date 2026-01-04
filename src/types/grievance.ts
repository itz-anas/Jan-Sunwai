export type GrievanceCategory = 
  | "Water Supply"
  | "Roads & Transport"
  | "Electricity"
  | "Sanitation"
  | "Public Safety"
  | "Healthcare"
  | "Education"
  | "General";

export type GrievancePriority = "High" | "Medium" | "Low";

export type GrievanceStatus = "Pending" | "In Progress" | "Resolved" | "Rejected";

export interface Grievance {
  id: string;
  ticketNumber: string;
  title?: string;
  description: string;
  category: GrievanceCategory;
  priority: GrievancePriority;
  status: GrievanceStatus;
  location: string;
  citizenName: string;
  citizenPhone: string;
  citizenEmail?: string;
  createdAt: Date;
  updatedAt: Date;
  adminRemarks?: string;
