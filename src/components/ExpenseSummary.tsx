import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import styles from '../styles/components/ExpenseSummary.module.css';

export const ExpenseSummary: React.FC = () => {
  const { expenses } = useExpenses();

  const monthlyData = expenses.reduce((acc: Record<string, number>, expense) => {
    const month = format(new Date(expense.date), 'MMM yyyy');
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total
  }));

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const averageExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Expense Summary</h2>
      <div className={styles.summaryGrid}>
        <div className={`${styles.summaryCard} ${styles.totalCard}`}>
          <p className={`${styles.cardLabel} ${styles.cardLabelTotal}`}>Total Expenses</p>
          <p className={`${styles.cardValue} ${styles.cardValueTotal}`}>
            ₹{totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className={`${styles.summaryCard} ${styles.averageCard}`}>
          <p className={`${styles.cardLabel} ${styles.cardLabelAverage}`}>Average Expense</p>
          <p className={`${styles.cardValue} ${styles.cardValueAverage}`}>
            ₹{averageExpense.toFixed(2)}
          </p>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Bar dataKey="total" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};