// API Service for frontend-backend communication
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export interface CreateGrievanceData {
  citizenName: string;
  citizenEmail?: string;
  citizenPhone: string;
  title: string;
  description: string;
  category: string;
  location?: string;
  priority?: string;
}

export interface GrievanceResponse {
  grievanceId: string;
  message: string;
  ticketNumber?: string;
}

export interface GrievanceData {
  grievanceId: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone: string;
  category: string;
  description: string;
  status: string;
  priority?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  adminRemarks?: string;
}

// Create a new grievance
export const createGrievance = async (data: CreateGrievanceData): Promise<GrievanceResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/grievances`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        citizenName: data.citizenName,
        citizenEmail: data.citizenEmail || "",
        citizenPhone: data.citizenPhone,
        category: data.category,
        description: data.description,
        title: data.title,
        location: data.location,
        priority: data.priority,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create grievance: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error creating grievance:", error);
    throw error;
  }
};

// Get all grievances
export const getGrievances = async (): Promise<GrievanceData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/grievances`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch grievances: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching grievances:", error);
    throw error;
  }
};

// Get grievance by ID
export const getGrievanceById = async (grievanceId: string): Promise<GrievanceData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/grievances/${grievanceId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch grievance: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error fetching grievance:", error);
    throw error;
  }
};

// Update grievance status
export const updateGrievanceStatus = async (
  grievanceId: string,
  status: string,
  adminRemarks?: string
): Promise<GrievanceResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/grievances/${grievanceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
        adminRemarks: adminRemarks || "",
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update grievance: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error updating grievance:", error);
    throw error;
  }
};

// Delete grievance
export const deleteGrievance = async (grievanceId: string): Promise<GrievanceResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/grievances/${grievanceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete grievance: ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error("Error deleting grievance:", error);
    throw error;
  }
};
