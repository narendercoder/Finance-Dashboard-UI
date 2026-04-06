import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { TransactionForm } from "@/components/TransactionForm";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { format } from "date-fns";

export default function Transactions() {
  const { state, dispatch } = useAppContext();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const filteredTransactions = state.transactions
    .filter((t) => {
      const matchesSearch = t.description
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesType =
        typeFilter === "all" || t.type === typeFilter;

      return matchesSearch && matchesType;
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  const handleEdit = (tx) => {
    setEditingTx(tx);
    setFormOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      dispatch({ type: "DELETE_TRANSACTION", payload: id });
    }
  };

  const openNewForm = () => {
    setEditingTx(null);
    setFormOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Transactions
          </h2>
          <p className="text-muted-foreground">
            Manage your income and expenses.
          </p>
        </div>

        {state.role === "admin" && (
          <Button onClick={openNewForm} data-testid="btn-new-tx">
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-testid="input-search-tx"
          />
        </div>

        {/* Filter */}
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger
            className="w-full sm:w-[180px]"
            data-testid="select-filter-type"
          >
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              {state.role === "admin" && (
                <TableHead className="w-[100px]" />
              )}
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={state.role === "admin" ? 5 : 4}
                  className="h-24 text-center"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredTransactions.map((tx) => (
                <TableRow key={tx.id} data-testid={`tx-row-${tx.id}`}>
                  
                  <TableCell>
                    {format(new Date(tx.date), "MMM dd, yyyy")}
                  </TableCell>

                  <TableCell className="font-medium">
                    {tx.description}
                  </TableCell>

                  <TableCell>
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-secondary text-secondary-foreground">
                      {tx.category}
                    </span>
                  </TableCell>

                  <TableCell
                    className={`text-right font-medium ${
                      tx.type === "income" ? "text-emerald-500" : ""
                    }`}
                  >
                    {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </TableCell>

                  {state.role === "admin" && (
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(tx)}
                          data-testid={`btn-edit-${tx.id}`}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(tx.id)}
                          className="text-destructive hover:text-destructive"
                          data-testid={`btn-delete-${tx.id}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>

                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </div>

      {/* Modal */}
      {formOpen && (
        <TransactionForm
          open={formOpen}
          onOpenChange={setFormOpen}
          transaction={editingTx}
        />
      )}
    </div>
  );
}