import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useAppContext } from "@/context/AppContext";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
export function BalanceTrendChart() {
  const {
    state
  } = useAppContext();
  const data = useMemo(() => {
    const today = new Date();
    const months = Array.from({
      length: 6
    }).map((_, i) => subMonths(today, 5 - i));
    let cumulativeBalance = 0;

    // Calculate initial balance before the 6 month window (simplified to 0 for this mock)

    return months.map(month => {
      const start = startOfMonth(month);
      const end = endOfMonth(month);
      const monthTransactions = state.transactions.filter(t => isWithinInterval(new Date(t.date), {
        start,
        end
      }));
      const monthNet = monthTransactions.reduce((acc, t) => t.type === "income" ? acc + t.amount : acc - t.amount, 0);
      cumulativeBalance += monthNet;
      return {
        name: format(month, "MMM"),
        balance: cumulativeBalance
      };
    });
  }, [state.transactions]);
  return <div className="h-[300px] w-full" data-testid="chart-balance-trend">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{
        top: 10,
        right: 10,
        left: 0,
        bottom: 0
      }}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} tickFormatter={value => `$${value}`} />
          <Tooltip contentStyle={{
          backgroundColor: "hsl(var(--card))",
          borderRadius: "8px",
          border: "1px solid hsl(var(--border))"
        }} formatter={value => [`$${value.toFixed(2)}`, "Balance"]} />
          <Area type="monotone" dataKey="balance" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorBalance)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>;
}