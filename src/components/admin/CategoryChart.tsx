import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGrievances } from "@/context/GrievanceContext";
import { GrievanceCategory } from "@/types/grievance";

const categoryColors: Record<GrievanceCategory, string> = {
  "Water Supply": "#0088FE",
  "Roads & Transport": "#00C49F",
  "Electricity": "#FFBB28",
  "Sanitation": "#FF8042",
  "Public Safety": "#8884d8",
  "Healthcare": "#82ca9d",
  "Education": "#ffc658",
  "General": "#999999",
};

export function CategoryChart() {
  const { grievances } = useGrievances();

  const chartData = useMemo(() => {
    const categoryCount: Record<string, number> = {};
    
    grievances.forEach((g) => {
      categoryCount[g.category] = (categoryCount[g.category] || 0) + 1;
    });

    return Object.entries(categoryCount)
      .map(([category, count]) => ({
        category: category.replace(" & ", "\n& "),
        shortName: category.split(" ")[0],
        fullCategory: category as GrievanceCategory,
        count,
      }))
      .sort((a, b) => b.count - a.count);
  }, [grievances]);

  return (
    <Card className="shadow-card animate-fade-up stagger-2">
      <CardHeader>
        <CardTitle className="font-display text-lg">Complaints by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 80, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" />
              <YAxis 
                type="category" 
                dataKey="shortName" 
                tick={{ fontSize: 12 }}
                width={70}
              />
              <Tooltip 
                formatter={(value, name, props) => [value, props.payload.fullCategory]}
                contentStyle={{ 
                  borderRadius: "8px", 
                  border: "1px solid hsl(var(--border))",
                  boxShadow: "var(--shadow-md)"
                }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors[entry.fullCategory]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
