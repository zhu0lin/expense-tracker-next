// app/api/expenses/route.ts
import { NextResponse } from 'next/server'

// In-memory storage (temporary - database comes later)
let expenses = [
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
  }
]

let nextId = 3

// GET /api/expenses - List all expenses
export async function GET() {
  return NextResponse.json(expenses)
}

// POST /api/expenses - Create new expense
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.description || !body.amount || !body.category || !body.date) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    // Create new expense
    const newExpense = {
      id: nextId++,
      description: body.description,
      amount: parseFloat(body.amount),
      category: body.category,
      date: body.date
    }
    
    expenses.push(newExpense)
    
    return NextResponse.json(newExpense, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
