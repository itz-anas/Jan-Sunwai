import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  gradient: "primary" | "success" | "warning" | "danger";
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
}

const gradientClasses = {
  primary: "gradient-primary",
  success: "gradient-success",
  warning: "gradient-warning",
  danger: "gradient-danger",
};

export function KPICard({ title, value, icon: Icon, gradient, trend }: KPICardProps) {
  return (
    <div className={`rounded-xl p-5 ${gradientClasses[gradient]} shadow-lg animate-scale-in`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-primary-foreground/80">{title}</p>
          <p className="text-3xl font-display font-bold text-primary-foreground mt-1">{value}</p>
          {trend && (
            <p className="text-xs text-primary-foreground/70 mt-2 flex items-center gap-1">
              <span className={trend.positive ? "text-green-200" : "text-red-200"}>
                {trend.positive ? "↑" : "↓"} {trend.value}%
              </span>
              <span>{trend.label}</span>
            </p>
          )}
        </div>
        <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center backdrop-blur-sm">
          <Icon className="w-6 h-6 text-primary-foreground" />
        </div>
      </div>
    </div>
  );
}
