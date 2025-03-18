import TransactionForm from '../components/TransactionForm';
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions');
    const data = await res.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    await fetch('/api/transactions', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    fetchTransactions();
  };

  const monthlyExpenses = transactions.reduce((acc, cur) => {
    const month = new Date(cur.date).toLocaleString('default', { month: 'long' });
    acc[month] = acc[month] ? acc[month] + cur.amount : cur.amount;
    return acc;
  }, {});

  const chartData = Object.keys(monthlyExpenses).map(month => ({
    name: month,
    expenses: monthlyExpenses[month],
  }));

  return (
    <div>
      <TransactionForm onAdd={fetchTransactions} />
      <BarChart width={600} height={300} data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="expenses" fill="#8884d8" />
      </BarChart>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            {transaction.description} - ${transaction.amount} on {new Date(transaction.date).toLocaleDateString()}
            <button onClick={() => handleDelete(transaction._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}