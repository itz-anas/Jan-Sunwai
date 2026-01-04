import { GrievanceAnalysis, GrievanceCategory, GrievancePriority } from "@/types/grievance";

// Mock AI analyzer - TODO: Replace with LangChain/Claude API in Phase 2
export function analyzeGrievance(text: string): GrievanceAnalysis {
  const lowerText = text.toLowerCase();
  
  let category: GrievanceCategory = "General";
  let priority: GrievancePriority = "Medium";
  let location = "Unknown";
  let confidence = 0.7;

  // Water-related keywords
  if (lowerText.includes("water") || lowerText.includes("pipe") || lowerText.includes("tap") || 
      lowerText.includes("supply") || lowerText.includes("leak") || lowerText.includes("drainage")) {
    category = "Water Supply";
    priority = "High";
    confidence = 0.85;
  }
  
  // Road-related keywords
  else if (lowerText.includes("road") || lowerText.includes("pothole") || lowerText.includes("street") ||
           lowerText.includes("traffic") || lowerText.includes("footpath") || lowerText.includes("bridge")) {
    category = "Roads & Transport";
    priority = "Medium";
    confidence = 0.82;
  }
  
  // Electricity-related keywords
  else if (lowerText.includes("electric") || lowerText.includes("power") || lowerText.includes("light") ||
           lowerText.includes("transformer") || lowerText.includes("wire") || lowerText.includes("voltage")) {
    category = "Electricity";
    priority = "High";
    confidence = 0.88;
  }
  
  // Sanitation-related keywords
  else if (lowerText.includes("garbage") || lowerText.includes("waste") || lowerText.includes("sewer") ||
           lowerText.includes("toilet") || lowerText.includes("clean") || lowerText.includes("dump")) {
    category = "Sanitation";
    priority = "Medium";
    confidence = 0.80;
  }
  
  // Safety-related keywords
  else if (lowerText.includes("crime") || lowerText.includes("theft") || lowerText.includes("police") ||
           lowerText.includes("danger") || lowerText.includes("security") || lowerText.includes("accident")) {
    category = "Public Safety";
    priority = "High";
    confidence = 0.90;
  }
  
  // Healthcare-related keywords
  else if (lowerText.includes("hospital") || lowerText.includes("doctor") || lowerText.includes("health") ||
           lowerText.includes("medicine") || lowerText.includes("clinic") || lowerText.includes("ambulance")) {
    category = "Healthcare";
    priority = "High";
    confidence = 0.87;
  }
  
  // Education-related keywords
  else if (lowerText.includes("school") || lowerText.includes("college") || lowerText.includes("education") ||
           lowerText.includes("teacher") || lowerText.includes("student") || lowerText.includes("exam")) {
    category = "Education";
    priority = "Medium";
    confidence = 0.83;
  }

  // Emergency keywords - upgrade priority
  if (lowerText.includes("urgent") || lowerText.includes("emergency") || lowerText.includes("immediate") ||
      lowerText.includes("critical") || lowerText.includes("danger") || lowerText.includes("life")) {
    priority = "High";
    confidence = Math.min(confidence + 0.1, 0.95);
  }

  // Location extraction (basic)
  const locationPatterns = [
    /(?:near|at|in|from)\s+([A-Za-z\s]+(?:road|street|colony|nagar|market|area|sector|block|ward))/i,
    /([A-Za-z\s]+(?:road|street|colony|nagar|market|area|sector|block|ward))/i,
  ];

  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match) {
      location = match[1].trim();
      break;
    }
  }

  return { category, priority, location, confidence };
}

// Generate unique ticket number
export function generateTicketNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `JS${year}${month}${random}`;
}
