// app/page.tsx
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Expense Tracker
        </h1>
        
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
          <p className="text-gray-600 mb-4">
            Track your expenses with ease. Get started by viewing your expenses.
          </p>
          
          <Link 
            href="/expenses"
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition"
          >
            View Expenses
          </Link>
        </div>
      </div>
    </main>
  )
}
