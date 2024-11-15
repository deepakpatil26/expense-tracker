import React from 'react';
import { ExpenseProvider } from './context/ExpenseContext';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';
import { Wallet } from 'lucide-react';
import styles from './styles/layout/Header.module.css';

function App() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-100">
        <nav className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.headerTitle}>
              <Wallet className={styles.logo} />
              <h1 className={styles.heading}>Expense Tracker</h1>
            </div>
          </div>
        </nav>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 gap-8">
            <ExpenseForm />
            <ExpenseSummary />
            <ExpenseList />
          </div>
        </main>
      </div>
    </ExpenseProvider>
  );
}

export default App;