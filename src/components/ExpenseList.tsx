import React, { useState } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2, Save, X } from 'lucide-react';
import { useExpenses } from '../context/ExpenseContext';
import { Expense } from '../types/expense';
import styles from '../styles/components/ExpenseList.module.css';

export const ExpenseList: React.FC = () => {
  const { expenses, editExpense, deleteExpense } = useExpenses();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Expense>>({});

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setEditForm(expense);
  };

  const handleSave = (id: string) => {
    editExpense(id, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableHeader}>
            <tr>
              <th className={styles.headerCell}>Date</th>
              <th className={styles.headerCell}>Description</th>
              <th className={styles.headerCell}>Category</th>
              <th className={styles.headerCell}>Amount</th>
              <th className={styles.headerCell}>Actions</th>
            </tr>
          </thead>
          <tbody className={styles.tableBody}>
            {expenses.map((expense) => (
              <tr key={expense.id} className={styles.tableRow}>
                <td className={styles.cellWhitespace}>
                  {editingId === expense.id ? (
                    <input
                      type="date"
                      value={editForm.date || ''}
                      onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      className={styles.editInput}
                    />
                  ) : (
                    format(new Date(expense.date), 'MMM dd, yyyy')
                  )}
                </td>
                <td className={styles.cell}>
                  {editingId === expense.id ? (
                    <input
                      type="text"
                      value={editForm.description || ''}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      className={styles.editInput}
                    />
                  ) : (
                    expense.description
                  )}
                </td>
                <td className={styles.cell}>
                  {editingId === expense.id ? (
                    <input
                      type="text"
                      value={editForm.category || ''}
                      onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      className={styles.editInput}
                    />
                  ) : (
                    expense.category
                  )}
                </td>
                <td className={styles.cell}>
                  {editingId === expense.id ? (
                    <input
                      type="number"
                      value={editForm.amount || ''}
                      onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) })}
                      className={styles.editInput}
                    />
                  ) : (
                    `₹${expense.amount.toFixed(2)}`
                  )}
                </td>
                <td className={styles.cellWhitespace}>
                  {editingId === expense.id ? (
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleSave(expense.id)} className={styles.saveButton}>
                        <Save size={18} />
                      </button>
                      <button onClick={handleCancel} className={styles.cancelButton}>
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className={styles.actionButtons}>
                      <button onClick={() => handleEdit(expense)} className={styles.editButton}>
                        <Pencil size={18} />
                      </button>
                      <button onClick={() => deleteExpense(expense.id)} className={styles.deleteButton}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};