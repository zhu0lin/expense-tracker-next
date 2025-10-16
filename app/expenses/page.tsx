// app/expenses/page.tsx
'use client'  // Need 'use client' because page uses useState

import { useState } from 'react'
import Link from 'next/link'
import ExpenseCard from '@/components/ExpenseCard/ExpenseCard'
import type { ExpenseCategory } from '@/components/ExpenseCard/ExpenseCard';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}

export default function ExpensesPage() {
    // State management - SAME as Vite!
    const [expenses, setExpenses] = useState<Expense[]>([
        {
        id: 1,
        description: "Lunch at downtown cafe",
        amount: 12.50,
        category: "Food",
        date: "2024-01-15"
        },
        {
        id: 2,
        description: "Monthly bus pass",
        amount: 95.00,
        category: "Transportation", 
        date: "2024-01-14"
        },
        {
        id: 3,
        description: "Movie tickets",
        amount: 25.00,
        category: "Entertainment", 
        date: "2024-01-13"
        }
    ]);

    const handleAddExpense = (expenseData: Omit<Expense, 'id'>): void => {
        const newExpense: Expense = {
        ...expenseData,
        id: Date.now()
        };
        setExpenses(prev => [...prev, newExpense]);
    };

    const handleDeleteExpense = (id: number): void => {
        setExpenses(prev => prev.filter(expense => expense.id !== id));
    };

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Expenses</h1>

          {/* Summary Card */}
          <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
            <p className="text-gray-700">
              Total: <span className="text-2xl font-bold text-green-600">
                ${totalAmount.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 ml-2">
                ({expenses.length} expenses)
              </span>
            </p>
          </div>
                
          {/* Expense Cards */}
          <div className="space-y-3">
            {expenses.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No expenses yet. Add some expenses to get started!
              </p>
            ) : (
              expenses.map(expense => (
                <ExpenseCard
                  key={expense.id}
                  {...expense}
                  onDelete={handleDeleteExpense}
                  highlighted={expense.amount > 50}
                />
              ))
            )}
          </div>
        
        <Link href="/" className="inline-block mt-4 text-blue-500 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
