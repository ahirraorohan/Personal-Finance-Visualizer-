import connect from '../../lib/mongodb';
import Transaction from '../../models/Transaction';

export default async function handler(req, res) {
  await connect();
  
  if (req.method === 'GET') {
    const transactions = await Transaction.find({});
    return res.json(transactions);
  }

  if (req.method === 'POST') {
    const transaction = await Transaction.create(req.body);
    return res.status(201).json(transaction);
  }
  
  if (req.method === 'DELETE') {
    await Transaction.findByIdAndDelete(req.body.id);
    return res.status(204).end();
  }
}