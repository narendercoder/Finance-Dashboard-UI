import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppContext } from "@/context/AppContext";
import { motion } from "framer-motion";
import { DollarSign, ArrowDownRight, ArrowUpRight, Activity } from "lucide-react";
import { BalanceTrendChart } from "@/components/charts/BalanceTrendChart";
import { SpendingByCategoryChart } from "@/components/charts/SpendingByCategoryChart";
export default function Dashboard() {
  const {
    state
  } = useAppContext();
  const {
    totalIncome,
    totalExpenses,
    balance
  } = useMemo(() => {
    let income = 0;
    let expenses = 0;
    state.transactions.forEach(t => {
      if (t.type === "income") income += t.amount;else expenses += t.amount;
    });
    return {
      totalIncome: income,
      totalExpenses: expenses,
      balance: income - expenses
    };
  }, [state.transactions]);
  const cards = [{
    title: "Total Balance",
    value: balance,
    icon: DollarSign,
    color: balance >= 0 ? "text-emerald-500" : "text-red-500"
  }, {
    title: "Total Income",
    value: totalIncome,
    icon: ArrowUpRight,
    color: "text-emerald-500"
  }, {
    title: "Total Expenses",
    value: totalExpenses,
    icon: ArrowDownRight,
    color: "text-amber-500"
  }, {
    title: "Transactions",
    value: state.transactions.length,
    icon: Activity,
    color: "text-blue-500",
    isCount: true
  }];
  return <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
        <p className="text-muted-foreground">Your financial summary at a glance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, i) => <motion.div key={card.title} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: i * 0.1
      }}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid={`summary-${card.title.toLowerCase().replace(' ', '-')}`}>
                  {card.isCount ? card.value : new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD"
              }).format(card.value)}
                </div>
              </CardContent>
            </Card>
          </motion.div>)}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Balance Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <BalanceTrendChart />
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <SpendingByCategoryChart />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {state.transactions.slice(0, 5).map(t => <div key={t.id} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{t.description}</p>
                    <p className="text-xs text-muted-foreground">{t.category} • {new Date(t.date).toLocaleDateString()}</p>
                  </div>
                  <div className={`text-sm font-medium ${t.type === 'income' ? 'text-emerald-500' : ''}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}