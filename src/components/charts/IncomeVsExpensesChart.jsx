import { useMemo } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { useAppContext } from "@/context/AppContext";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
export function IncomeVsExpensesChart() {
  const {
    state
  } = useAppContext();
  const data = useMemo(() => {
    const today = new Date();
    const months = Array.from({
      length: 6
    }).map((_, i) => subMonths(today, 5 - i));
    return months.map(month => {
      const start = startOfMonth(month);
      const end = endOfMonth(month);
      const monthTransactions = state.transactions.filter(t => isWithinInterval(new Date(t.date), {
        start,
        end
      }));
      const income = monthTransactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
      const expenses = monthTransactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
      return {
        name: format(month, "MMM"),
        Income: income,
        Expenses: expenses
      };
    });
  }, [state.transactions]);
  return <div className="h-[300px] w-full" data-testid="chart-income-expenses">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{
        top: 10,
        right: 10,
        left: 0,
        bottom: 0
      }}>
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `$${value}`} />
          <Tooltip contentStyle={{
          backgroundColor: "hsl(var(--card))",
          borderRadius: "8px",
          border: "1px solid hsl(var(--border))"
        }} formatter={value => [`$${value.toFixed(2)}`]} cursor={{
          fill: "hsl(var(--muted))"
        }} />
          <Legend />
          <Bar dataKey="Income" fill="hsl(142.1 70.6% 45.3%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Expenses" fill="hsl(0 84.2% 60.2%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>;
}