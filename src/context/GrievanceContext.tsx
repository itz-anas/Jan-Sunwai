import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Grievance, GrievanceStatus } from "@/types/grievance";
import { analyzeGrievance, generateTicketNumber } from "@/utils/grievanceAnalyzer";
import * as apiService from "@/services/api";


interface GrievanceContextType {
  grievances: Grievance[];
  addGrievance: (title: string, description: string, citizenName: string, citizenPhone: string, citizenEmail?: string) => Promise<Grievance>;
  updateGrievanceStatus: (id: string, status: GrievanceStatus, adminRemarks?: string) => Promise<void>;
  getGrievanceByTicket: (ticketNumber: string) => Grievance | undefined;
  loading: boolean;
  error: string | null;
  fetchGrievances: () => Promise<void>;
}


const GrievanceContext = createContext<GrievanceContextType | undefined>(undefined);


// Sample data for demo (fallback)
const initialGrievances: Grievance[] = [
  {
    id: "1",
    ticketNumber: "JS250101",
    title: "Water Leakage in Main Pipeline",
    description: "Severe water leakage in main pipeline near Sector 15 market. Water is wasting since 3 days.",
    category: "Water Supply",
    priority: "High",
    status: "In Progress",
    location: "Sector 15 Market",
    citizenName: "Rajesh Kumar",
    citizenPhone: "9876543210",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    ticketNumber: "JS250102",
    title: "Multiple Potholes on MG Road",
    description: "Multiple potholes on MG Road causing accidents. Very dangerous for two-wheelers.",
    category: "Roads & Transport",
    priority: "High",
    status: "Pending",
    location: "MG Road",
    citizenName: "Priya Sharma",
    citizenPhone: "8765432109",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    ticketNumber: "JS250103",
    title: "Street Lights Not Working",
    description: "Street lights not working in Gandhi Nagar area for past week. Very unsafe at night.",
    category: "Electricity",
    priority: "Medium",
    status: "Resolved",
    location: "Gandhi Nagar",
    citizenName: "Mohammed Ali",
    citizenPhone: "7654321098",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    ticketNumber: "JS250104",
    title: "Garbage Not Collected",
    description: "Garbage not collected in our colony for 4 days. Bad smell and health hazard.",
    category: "Sanitation",
    priority: "Medium",
    status: "Pending",
    location: "Nehru Colony",
    citizenName: "Sunita Devi",
    citizenPhone: "6543210987",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    ticketNumber: "JS250105",
    title: "No Doctor at Primary Health Center",
    description: "No doctor available at Primary Health Center in Ward 7. Patients suffering.",
    category: "Healthcare",
    priority: "High",
    status: "In Progress",
    location: "Ward 7 PHC",
    citizenName: "Ramesh Gupta",
    citizenPhone: "5432109876",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
];


export function GrievanceProvider({ children }: { children: ReactNode }) {
  const [grievances, setGrievances] = useState<Grievance[]>(initialGrievances);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // Fetch grievances from API on mount
  useEffect(() => {
    fetchGrievances();
  }, []);


  const fetchGrievances = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiService.getGrievances();
      const mappedGrievances = data.map((item: any) => ({
        id: item.grievanceId || item.id,
        ticketNumber: generateTicketNumber(),
        title: item.title || '',
        description: item.description,
        category: item.category,
        priority: item.priority || 'Medium',
        status: item.status === 'PENDING' ? 'Pending' : item.status === 'IN_PROGRESS' ? 'In Progress' : item.status === 'RESOLVED' ? 'Resolved' : 'Pending',
        location: item.location || '',
        citizenName: item.citizenName,
        citizenPhone: item.citizenPhone,
        citizenEmail: item.citizenEmail,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
        adminRemarks: item.adminRemarks || '',
      }));
      setGrievances(mappedGrievances);
    } catch (err) {
      console.error('Error fetching grievances:', err);
      setError('Failed to fetch grievances. Using local data.');
      // Keep using local data as fallback
    } finally {
      setLoading(false);
    }
  };


  const addGrievance = async (
    title: string,
    description: string,
    citizenName: string,
    citizenPhone: string,
    citizenEmail?: string
  ): Promise<Grievance> => {
    const analysis = analyzeGrievance(description);
    const now = new Date();
    const ticketNumber = generateTicketNumber();
    
    try {
      // Call API to save grievance
      const apiResult = await apiService.createGrievance({
        title,
        description,
        citizenName,
        citizenPhone,
        citizenEmail,
        category: analysis.category,
        priority: analysis.priority,
        location: analysis.location,
      });

      const newGrievance: Grievance = {
        id: apiResult.grievanceId,
        ticketNumber: ticketNumber,
        title,
        description,
        category: analysis.category,
        priority: analysis.priority,
        status: "Pending",
        location: analysis.location,
        citizenName,
        citizenPhone,
        citizenEmail,
        createdAt: now,
        updatedAt: now,
      };

      setGrievances((prev) => [newGrievance, ...prev]);
      return newGrievance;
    } catch (err) {
      console.error('Error adding grievance:', err);
      setError('Failed to submit grievance. Please try again.');
      
      // Still create locally for offline support
      const newGrievance: Grievance = {
        id: Date.now().toString(),
        ticketNumber,
        title,
        description,
        category: analysis.category,
        priority: analysis.priority,
        status: "Pending",
        location: analysis.location,
        citizenName,
        citizenPhone,
        citizenEmail,
        createdAt: now,
        updatedAt: now,
      };

      setGrievances((prev) => [newGrievance, ...prev]);
      return newGrievance;
    }
  };


  const updateGrievanceStatus = async (
    id: string,
    status: GrievanceStatus,
    adminRemarks?: string
  ) => {
    try {
      await apiService.updateGrievanceStatus(id, status, adminRemarks);
      
      setGrievances((prev) =>
        prev.map((g) =>
          g.id === id
            ? { ...g, status, updatedAt: new Date(), adminRemarks: adminRemarks || '' }
            : g
        )
      );
    } catch (err) {
      console.error('Error updating grievance status:', err);
      setError('Failed to update grievance status.');
      // Still update locally for offline support
      setGrievances((prev) =>
        prev.map((g) =>
          g.id === id
            ? { ...g, status, updatedAt: new Date(), adminRemarks: adminRemarks || '' }
            : g
        )
      );
    }
  };


  const getGrievanceByTicket = (ticketNumber: string): Grievance | undefined => {
    return grievances.find((g) => g.ticketNumber === ticketNumber);
  };


  return (
    <GrievanceContext.Provider
      value={{ grievances, addGrievance, updateGrievanceStatus, getGrievanceByTicket, loading, error, fetchGrievances }}
    >
      {children}
    </GrievanceContext.Provider>
  );
}


export function useGrievances() {
  const context = useContext(GrievanceContext);
  if (!context) {
    throw new Error("useGrievances must be used within a GrievanceProvider");
  }
  return context;
}
