export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
}

export type ExpenseContextType = {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  editExpense: (id: string, expense: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
};