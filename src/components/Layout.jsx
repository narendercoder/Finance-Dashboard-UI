import { Link, useLocation } from "wouter";
import { LayoutDashboard, Receipt, LineChart, Wallet } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { RoleSwitcher } from "./RoleSwitcher";
import { useAppContext } from "@/context/AppContext";
import { cn } from "@/lib/utils";

export function Layout({ children }) {
  const [location] = useLocation();
  const { state } = useAppContext();

  const navItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/transactions", label: "Transactions", icon: Receipt },
    { href: "/insights", label: "Insights", icon: LineChart },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-border bg-card flex flex-col">
        
        {/* Logo */}
        <div className="p-6 flex items-center gap-3 border-b">
          <Wallet className="h-6 w-6 text-primary" />
          <h1 className="font-bold text-lg">FinanceOS</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 flex md:flex-col">
          {navItems.map((item) => {
            const isActive = location.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t mt-auto hidden md:block">
          <div className="text-xs mb-2">Account</div>
          <div className="flex justify-between">
            <RoleSwitcher />
            <ThemeToggle />
          </div>
          <div className="mt-4 text-xs opacity-70">
            Role: <span className="font-bold">{state.role}</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        
        {/* Mobile Header */}
        <header className="h-16 flex md:hidden items-center justify-between px-4 border-b bg-card">
          <div className="font-semibold">FinanceOS</div>
          <div className="flex gap-2">
            <RoleSwitcher />
            <ThemeToggle />
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
}