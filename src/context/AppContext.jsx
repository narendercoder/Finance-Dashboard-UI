import { createContext, useContext, useEffect, useReducer } from "react";
import { mockTransactions } from "@/data/mockData";
const initialState = {
  transactions: [],
  role: "viewer",
  theme: "system"
};
function appReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    case "UPDATE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t)
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      };
    case "SET_ROLE":
      return {
        ...state,
        role: action.payload
      };
    case "SET_THEME":
      return {
        ...state,
        theme: action.payload
      };
    case "INIT_STATE":
      return action.payload;
    default:
      return state;
  }
}
const AppContext = createContext(undefined);
export function AppProvider({
  children
}) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  useEffect(() => {
    const savedState = localStorage.getItem("finance-dashboard-state");
    if (savedState) {
      dispatch({
        type: "INIT_STATE",
        payload: JSON.parse(savedState)
      });
    } else {
      dispatch({
        type: "INIT_STATE",
        payload: {
          ...initialState,
          transactions: mockTransactions
        }
      });
    }
  }, []);
  useEffect(() => {
    if (state.transactions.length > 0) {
      localStorage.setItem("finance-dashboard-state", JSON.stringify(state));
    }
  }, [state]);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (state.theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(state.theme);
    }
  }, [state.theme]);
  return <AppContext.Provider value={{
    state,
    dispatch
  }}>
      {children}
    </AppContext.Provider>;
}
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}