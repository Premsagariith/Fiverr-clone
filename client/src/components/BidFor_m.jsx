import { useState } from 'react';
import { placeBid } from '../services/api';

export default function BidForm({ jobId }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await placeBid({ jobId, amount });
      alert('Bid placed successfully!');
      setAmount('');
    } catch (err) {
      alert('Failed to place bid.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Your Bid Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Place Bid</button>
    </form>
  );
}
