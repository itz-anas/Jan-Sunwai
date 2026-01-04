import { useMemo } from "react";
import { FileText, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { KPICard } from "./KPICard";
import { CategoryChart } from "./CategoryChart";
import { GrievanceTable } from "./GrievanceTable";
import { useGrievances } from "@/context/GrievanceContext";

export function AdminDashboard() {
  const { grievances } = useGrievances();

  const stats = useMemo(() => {
    const total = grievances.length;
    const pending = grievances.filter((g) => g.status === "Pending").length;
    const inProgress = grievances.filter((g) => g.status === "In Progress").length;
    const highPriority = grievances.filter((g) => g.priority === "High").length;
    const resolved = grievances.filter((g) => g.status === "Resolved").length;

    return { total, pending, inProgress, highPriority, resolved };
  }, [grievances]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 animate-fade-up">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          Admin Dashboard
        </h2>
        <p className="text-muted-foreground mt-1">
          Monitor and manage all citizen grievances in real-time
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPICard
          title="Total Complaints"
          value={stats.total}
          icon={FileText}
          gradient="primary"
        />
        <KPICard
          title="Pending Review"
          value={stats.pending}
          icon={Clock}
          gradient="warning"
        />
        <KPICard
          title="High Priority"
          value={stats.highPriority}
          icon={AlertTriangle}
          gradient="danger"
        />
        <KPICard
          title="Resolved"
          value={stats.resolved}
          icon={CheckCircle}
          gradient="success"
        />
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <CategoryChart />
        
        {/* Quick Stats Card */}
        <div className="bg-card rounded-xl shadow-card border border-border p-6 animate-fade-up stagger-2">
          <h3 className="font-display font-semibold text-lg mb-4">Resolution Overview</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Resolution Rate</span>
                <span className="font-medium">
                  {stats.total > 0 ? Math.round((stats.resolved / stats.total) * 100) : 0}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full gradient-success rounded-full transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (stats.resolved / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">In Progress</span>
                <span className="font-medium">
                  {stats.total > 0 ? Math.round((stats.inProgress / stats.total) * 100) : 0}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-info rounded-full transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (stats.inProgress / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Pending</span>
                <span className="font-medium">
                  {stats.total > 0 ? Math.round((stats.pending / stats.total) * 100) : 0}%
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full gradient-warning rounded-full transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (stats.pending / stats.total) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-2xl font-display font-bold text-primary">{stats.inProgress}</p>
                <p className="text-xs text-muted-foreground">Being Processed</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="text-2xl font-display font-bold text-destructive">{stats.highPriority}</p>
                <p className="text-xs text-muted-foreground">Need Attention</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <GrievanceTable />
    </div>
  );
}
