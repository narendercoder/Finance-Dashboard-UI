import { useAppContext } from "@/context/AppContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useMemo } from "react";
import { IncomeVsExpensesChart } from "@/components/charts/IncomeVsExpensesChart";
import {
  startOfMonth,
  subMonths,
  isWithinInterval,
  endOfMonth,
} from "date-fns";

export default function Insights() {
  const { state } = useAppContext();

  const insights = useMemo(() => {
    const expenses = state.transactions.filter((t) => t.type === "expense");

    // Category breakdown
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const topCategory = Object.entries(categoryTotals).sort(
      (a, b) => b[1] - a[1]
    )[0];

    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);

    // Top 5 transactions
    const topTransactions = [...expenses]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    // Month-over-month
    const today = new Date();
    const currentMonthStart = startOfMonth(today);
    const currentMonthEnd = endOfMonth(today);

    const prevMonthStart = startOfMonth(subMonths(today, 1));
    const prevMonthEnd = endOfMonth(subMonths(today, 1));

    const currentMonthExpenses = expenses
      .filter((t) =>
        isWithinInterval(new Date(t.date), {
          start: currentMonthStart,
          end: currentMonthEnd,
        })
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const prevMonthExpenses = expenses
      .filter((t) =>
        isWithinInterval(new Date(t.date), {
          start: prevMonthStart,
          end: prevMonthEnd,
        })
      )
      .reduce((sum, t) => sum + t.amount, 0);

    let momChange = 0;
    if (prevMonthExpenses > 0) {
      momChange =
        ((currentMonthExpenses - prevMonthExpenses) /
          prevMonthExpenses) *
        100;
    }

    // Avg daily (last 30 days)
    const thirtyDaysAgo = subMonths(today, 1);
    const last30DaysExpenses = expenses
      .filter((t) =>
        isWithinInterval(new Date(t.date), {
          start: thirtyDaysAgo,
          end: today,
        })
      )
      .reduce((sum, t) => sum + t.amount, 0);

    const avgDailySpending = last30DaysExpenses / 30;

    return {
      topCategory: topCategory
        ? {
            name: topCategory[0],
            amount: topCategory[1],
            percentage:
              (topCategory[1] / totalExpenses) * 100,
          }
        : null,
      topTransactions,
      totalExpenses,
      currentMonthExpenses,
      momChange,
      avgDailySpending,
    };
  }, [state.transactions]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Insights
        </h2>
        <p className="text-muted-foreground">
          Deep dive into your spending habits.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        
        {/* Avg Daily */}
        <Card>
          <CardHeader>
            <CardTitle>Avg Daily Spending</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              ${insights.avgDailySpending.toFixed(2)}
            </div>
            <p className="text-sm text-muted-foreground">
              Per day on average
            </p>
          </CardContent>
        </Card>

        {/* MoM */}
        <Card>
          <CardHeader>
            <CardTitle>MoM Comparison</CardTitle>
            <CardDescription>
              Current vs Previous Month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              {insights.momChange > 0 ? "+" : ""}
              {insights.momChange.toFixed(1)}%
            </div>
            <p
              className={`text-sm ${
                insights.momChange > 0
                  ? "text-red-500"
                  : "text-emerald-500"
              }`}
            >
              {insights.momChange > 0
                ? "Increased"
                : "Decreased"}{" "}
              spending
            </p>
          </CardContent>
        </Card>

        {/* Top Category */}
        <Card>
          <CardHeader>
            <CardTitle>Top Category</CardTitle>
            <CardDescription>
              Where your money goes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {insights.topCategory ? (
              <>
                <div className="text-2xl font-bold mb-1 truncate">
                  {insights.topCategory.name}
                </div>
                <div className="text-xl text-muted-foreground mb-1">
                  ${insights.topCategory.amount.toFixed(2)}
                </div>
                <div className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary">
                  {insights.topCategory.percentage.toFixed(1)}% of total
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">
                No data
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Charts + List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Chart */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>
              Income vs Expenses (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <IncomeVsExpensesChart />
          </CardContent>
        </Card>

        {/* Top Transactions */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>
              Top 5 Largest Expenses
            </CardTitle>
            <CardDescription>
              Your biggest purchases
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {insights.topTransactions.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between border-b pb-2 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {t.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.category} •{" "}
                      {new Date(t.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-sm font-bold text-amber-500">
                    ${t.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}