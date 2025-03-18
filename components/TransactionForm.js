import { useForm } from 'react-hook-form';
import React from 'react';

export default function TransactionForm({ onAdd }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      onAdd();
      reset(); // Clear form after successful submission
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('amount', { required: 'Amount is required' })} placeholder="Amount" type="number" />
      {errors.amount && <p>{errors.amount.message}</p>}

      <input {...register('date', { required: 'Date is required' })} type="date" />
      {errors.date && <p>{errors.date.message}</p>}

      <input {...register('description', { required: 'Description is required' })} placeholder="Description" />
      {errors.description && <p>{errors.description.message}</p>}

      <button type="submit">Add Transaction</button>+
    </form>
  );
}
