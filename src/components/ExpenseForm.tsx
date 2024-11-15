import React, { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useExpenses } from "../context/ExpenseContext";
import styles from "../styles/components/ExpenseForm.module.css";

const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Others",
];

export const ExpenseForm: React.FC = () => {
  const { addExpense } = useExpenses();
  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    category: "Food & Dining",
    date: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addExpense({
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
    });
    setFormData({
      description: "",
      amount: "",
      category: "Food & Dining",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGrid}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Description</label>
          <input
            type="text"
            required
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className={styles.input}
            placeholder="Enter expense description"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Amount (₹)</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            className={styles.input}
            placeholder="Enter amount"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Category</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className={styles.select}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Date</label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={styles.input}
          />
        </div>
      </div>
      <button type="submit" className={styles.submitButton}>
        <PlusCircle size={20} />
        Add Expense
      </button>
    </form>
  );
};
