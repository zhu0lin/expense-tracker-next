// src/components/ExpenseList/ExpenseList.tsx
import React, { useState } from 'react';
import ExpenseCard from '../ExpenseCard/ExpenseCard';
import type { ExpenseCategory } from '../ExpenseCard/ExpenseCard';
import type { ExpenseCardProps } from '../ExpenseCard/ExpenseCard';

// Type for expense data (reusing interface from ExpenseCard)
type Expense = ExpenseCardProps; 
type FilterOption = 'All' | ExpenseCategory;

/**
 * Props interface for ExpenseList component
 * FIXED: expenses is now required (not optional initialExpenses)
 * @interface ExpenseListProps
 * @property {Expense[]} expenses - Current expense data from parent component (App.tsx)
 */
interface ExpenseListProps {
  expenses: Expense[];  // FIXED: Required prop, receives current state from App
}

/**
 * ExpenseList Component - FIXED VERSION
 * 
 * IMPORTANT CHANGE: This component no longer manages expense data in local state.
 * It receives expenses as props from App.tsx and only manages UI state (filtering).
 * 
 * This fixes the "duplicate state" bug where:
 * - App.tsx had expense state (updated by form)
 * - ExpenseList had separate expense state (never updated)
 * 
 * Now there's a SINGLE SOURCE OF TRUTH in App.tsx
 * 
 * @param {ExpenseListProps} props - Component props
 * @returns {JSX.Element} Rendered expense list with filtering controls
 */
const ExpenseList: React.FC<ExpenseListProps> = ({ expenses }) => {
  
  // ONLY manage UI state (filtering) - NOT expense data
  const [filterCategory, setFilterCategory] = useState<FilterOption>('All');

  // Filter expenses from props (not local state)
  const filteredExpenses = filterCategory === 'All' 
    ? expenses  // Use expenses from props
    : expenses.filter(expense => expense.category === filterCategory);

  // Calculate total for the currently filtered expenses
  const filteredTotal = filteredExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  /**
   * Handles category filter change from select dropdown
   * @param {React.ChangeEvent<HTMLSelectElement>} event - Select change event
   */
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategory(event.target.value as FilterOption);
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Expenses</h2>
        
        <div className="mb-6">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 mb-2">Filter by category:</label>
          <select 
            id="category-filter"
            value={filterCategory}
            onChange={handleCategoryChange}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white text-gray-700 cursor-pointer transition-colors hover:border-indigo-600 focus:outline-none focus:border-indigo-600 focus:ring-3 focus:ring-indigo-100"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-lg font-bold text-indigo-600 m-0">
          Total: ${filteredTotal.toFixed(2)} ({filteredExpenses.length} expenses)
        </p>
      </div>

      <div>
        {filteredExpenses.length === 0 ? (
          <div className="text-center py-10 px-5 text-gray-500">
            <p className="text-base m-0">
              No expenses found. Add some expenses to get started!
            </p>
          </div>
        ) : (
          filteredExpenses.map(expense => (
            <ExpenseCard
              key={expense.id}
              {...expense}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
