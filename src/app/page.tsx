"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  date: string;
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  
  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);


  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      alert("Please fill all fields.");
      return;
    }

    const newTransaction = { description, amount: Number(amount), date };

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      if (res.ok) {
        fetchTransactions();
        setDescription("");
        setAmount("");
        setDate("");
      } else {
        console.error("Failed to add transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  
  const chartData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.date).toLocaleString("default", { month: "short" });
    const existing = acc.find((entry) => entry.month === month);
    if (existing) {
      existing.total += transaction.amount;
    } else {
      acc.push({ month, total: transaction.amount });
    }
    return acc;
  }, [] as { month: string; total: number }[]);

  return (
    <main className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Personal Finance Visualizer</h1>

      {}
      <section className="w-full max-w-md bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Add Transaction</h2>
        <form onSubmit={handleAddTransaction} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 rounded">Add</button>
        </form>
      </section>

      {/* Transactions List */}
      <section className="w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-2">Transactions</h2>
        <ul className="border rounded p-2">
          {transactions.length === 0 ? (
            <li className="text-gray-500">No transactions available.</li>
          ) : (
            transactions.map((transaction) => (
              <li key={transaction._id} className="flex justify-between p-2 border-b">
                <span>{transaction.description}</span>
                <span>${transaction.amount}</span>
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Monthly Expenses Chart */}
      <section className="w-full max-w-md mt-6">
        <h2 className="text-xl font-semibold mb-2">Monthly Expenses</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
}
