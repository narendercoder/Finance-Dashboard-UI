import { useMemo } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useAppContext } from "@/context/AppContext";
const COLORS = ["#3b82f6", "#22c55e", "#f97316", "#a855f7", "#ef4444", "#14b8a6", "#eab308", "#6366f1"];
export function SpendingByCategoryChart() {
  const {
    state
  } = useAppContext();
  const data = useMemo(() => {
    const expenses = state.transactions.filter(t => t.type === "expense");
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value
    })).sort((a, b) => b.value - a.value);
  }, [state.transactions]);
  if (data.length === 0) {
    return <div className="h-[300px] flex items-center justify-center text-muted-foreground">
        No expense data to display
      </div>;
  }
  return <div className="h-[300px] w-full" data-testid="chart-spending-category">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="40%" innerRadius={55} outerRadius={80} paddingAngle={2} dataKey="value" isAnimationActive={false}>
            {data.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{
          backgroundColor: "hsl(var(--card))",
          borderRadius: "8px",
          border: "1px solid hsl(var(--border))"
        }} formatter={value => [`$${value.toFixed(2)}`, "Amount"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>;
}