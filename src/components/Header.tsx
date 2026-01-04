import { Scale } from "lucide-react";

interface HeaderProps {
  activeTab: "citizen" | "admin";
  onTabChange: (tab: "citizen" | "admin") => void;
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="gradient-primary shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-foreground/10 backdrop-blur-sm">
              <Scale className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-display font-bold text-primary-foreground tracking-tight">
                जन-सुनवाई
              </h1>
              <p className="text-xs md:text-sm text-primary-foreground/80">
                Public Grievance Redressal System
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex rounded-lg bg-primary-foreground/10 p-1 backdrop-blur-sm">
            <button
              onClick={() => onTabChange("citizen")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "citizen"
                  ? "bg-primary-foreground text-primary shadow-md"
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              Citizen Portal
            </button>
            <button
              onClick={() => onTabChange("admin")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "admin"
                  ? "bg-primary-foreground text-primary shadow-md"
                  : "text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              }`}
            >
              Admin Dashboard
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
