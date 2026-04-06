import { subDays } from "date-fns";
let _idCounter = 1;
const generateId = () => `txn-${_idCounter++}`;
const today = new Date();
export const mockTransactions = [{
  id: generateId(),
  date: subDays(today, 2).toISOString(),
  description: "TechCorp Salary",
  category: "Salary",
  amount: 6500,
  type: "income"
}, {
  id: generateId(),
  date: subDays(today, 3).toISOString(),
  description: "Whole Foods",
  category: "Food & Dining",
  amount: 145.20,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 4).toISOString(),
  description: "Uber",
  category: "Transportation",
  amount: 24.50,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 5).toISOString(),
  description: "Rent",
  category: "Housing",
  amount: 2400,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 8).toISOString(),
  description: "ConEdison",
  category: "Utilities",
  amount: 85.00,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 10).toISOString(),
  description: "Vanguard Deposit",
  category: "Investment",
  amount: 500,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 12).toISOString(),
  description: "Upwork Client",
  category: "Freelance",
  amount: 1200,
  type: "income"
}, {
  id: generateId(),
  date: subDays(today, 15).toISOString(),
  description: "CVS Pharmacy",
  category: "Healthcare",
  amount: 35.80,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 16).toISOString(),
  description: "Netflix",
  category: "Entertainment",
  amount: 15.99,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 18).toISOString(),
  description: "Amazon",
  category: "Shopping",
  amount: 112.45,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 22).toISOString(),
  description: "Trader Joe's",
  category: "Food & Dining",
  amount: 89.30,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 25).toISOString(),
  description: "Monthly Subway Pass",
  category: "Transportation",
  amount: 127.00,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 28).toISOString(),
  description: "Internet Bill",
  category: "Utilities",
  amount: 65.00,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 32).toISOString(),
  description: "TechCorp Salary",
  category: "Salary",
  amount: 6500,
  type: "income"
}, {
  id: generateId(),
  date: subDays(today, 35).toISOString(),
  description: "Rent",
  category: "Housing",
  amount: 2400,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 38).toISOString(),
  description: "Dental Copay",
  category: "Healthcare",
  amount: 150.00,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 40).toISOString(),
  description: "Apple Store",
  category: "Shopping",
  amount: 210.00,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 42).toISOString(),
  description: "Spotify",
  category: "Entertainment",
  amount: 10.99,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 45).toISOString(),
  description: "Sweetgreen",
  category: "Food & Dining",
  amount: 65.40,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 50).toISOString(),
  description: "Vanguard Deposit",
  category: "Investment",
  amount: 500,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 55).toISOString(),
  description: "Lyft",
  category: "Transportation",
  amount: 32.10,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 60).toISOString(),
  description: "TechCorp Salary",
  category: "Salary",
  amount: 6500,
  type: "income"
}, {
  id: generateId(),
  date: subDays(today, 65).toISOString(),
  description: "Rent",
  category: "Housing",
  amount: 2400,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 70).toISOString(),
  description: "Electric Bill",
  category: "Utilities",
  amount: 90.00,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 75).toISOString(),
  description: "AMC Theaters",
  category: "Entertainment",
  amount: 45.00,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 80).toISOString(),
  description: "Target",
  category: "Shopping",
  amount: 78.50,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 85).toISOString(),
  description: "Whole Foods",
  category: "Food & Dining",
  amount: 130.25,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 90).toISOString(),
  description: "TechCorp Salary",
  category: "Salary",
  amount: 6500,
  type: "income"
}, {
  id: generateId(),
  date: subDays(today, 95).toISOString(),
  description: "Rent",
  category: "Housing",
  amount: 2400,
  type: "expense"
}, {
  id: generateId(),
  date: subDays(today, 100).toISOString(),
  description: "Upwork Client",
  category: "Freelance",
  amount: 800,
  type: "income"
}];