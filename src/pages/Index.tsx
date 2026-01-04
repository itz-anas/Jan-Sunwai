import { useState } from "react";
import { Header } from "@/components/Header";
import { CitizenPortal } from "@/components/citizen/CitizenPortal";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { GrievanceProvider } from "@/context/GrievanceContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState<"citizen" | "admin">("citizen");

  return (
    <GrievanceProvider>
      <div className="min-h-screen bg-background">
        <Header activeTab={activeTab} onTabChange={setActiveTab} />
        <main className="pb-12">
          {activeTab === "citizen" ? <CitizenPortal /> : <AdminDashboard />}
        </main>
        <footer className="border-t border-border bg-card py-6">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Jan-Sunwai | Public Grievance Redressal System
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Empowering citizens through transparent governance
            </p>
          </div>
        </footer>
      </div>
    </GrievanceProvider>
  );
};

export default Index;
