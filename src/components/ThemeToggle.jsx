import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
export function ThemeToggle() {
  const {
    state,
    dispatch
  } = useAppContext();
  return <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" data-testid="button-theme-toggle">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => dispatch({
        type: "SET_THEME",
        payload: "light"
      })}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch({
        type: "SET_THEME",
        payload: "dark"
      })}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => dispatch({
        type: "SET_THEME",
        payload: "system"
      })}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>;
}