import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppContext } from "@/context/AppContext";
const generateId = () => `txn-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const categories = ["Housing", "Food & Dining", "Transportation", "Healthcare", "Entertainment", "Shopping", "Utilities", "Salary", "Freelance", "Investment"];
const schema = z.object({
  description: z.string().min(1, "Description is required"),
  amount: z.coerce.number().positive("Amount must be positive"),
  category: z.enum(categories),
  type: z.enum(["income", "expense"]),
  date: z.string().min(1, "Date is required")
});
export function TransactionForm({
  open,
  onOpenChange,
  transaction
}) {
  const {
    dispatch
  } = useAppContext();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: transaction ? {
      description: transaction.description,
      amount: transaction.amount,
      category: transaction.category,
      type: transaction.type,
      date: transaction.date.split("T")[0]
    } : {
      description: "",
      amount: 0,
      category: "Food & Dining",
      type: "expense",
      date: new Date().toISOString().split("T")[0]
    }
  });
  const onSubmit = data => {
    const payload = {
      id: transaction ? transaction.id : generateId(),
      description: data.description,
      amount: data.amount,
      category: data.category,
      type: data.type,
      date: new Date(data.date).toISOString()
    };
    if (transaction) {
      dispatch({
        type: "UPDATE_TRANSACTION",
        payload
      });
    } else {
      dispatch({
        type: "ADD_TRANSACTION",
        payload
      });
    }
    onOpenChange(false);
    form.reset();
  };
  return <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]" data-testid="dialog-transaction-form">
        <DialogHeader>
          <DialogTitle>{transaction ? "Edit Transaction" : "Add Transaction"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" {...form.register("description")} data-testid="input-desc" />
            {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input id="amount" type="number" step="0.01" {...form.register("amount")} data-testid="input-amount" />
              {form.formState.errors.amount && <p className="text-sm text-destructive">{form.formState.errors.amount.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" {...form.register("date")} data-testid="input-date" />
              {form.formState.errors.date && <p className="text-sm text-destructive">{form.formState.errors.date.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={form.watch("type")} onValueChange={val => form.setValue("type", val)}>
                <SelectTrigger id="type" data-testid="select-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={form.watch("category")} onValueChange={val => form.setValue("category", val)}>
                <SelectTrigger id="category" data-testid="select-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" data-testid="btn-save-transaction">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>;
}