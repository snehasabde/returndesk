'use client';

import { useState } from 'react';

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateRequestModal({ isOpen, onClose, onCreated }: CreateRequestModalProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    orderId: '',
    itemId: '',
    quantity: 1,
    reason: 'DAMAGED',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create request.');
      }

      onCreated();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Create Return Request</h2>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-3 text-sm">
          <div>
            <label className="block font-medium">Customer Name</label>
            <input required type="text" className="w-full border rounded p-2" value={formData.customerName} onChange={(e) => setFormData({ ...formData, customerName: e.target.value })} />
          </div>
          <div>
            <label className="block font-medium">Customer Email</label>
            <input required type="email" className="w-full border rounded p-2" value={formData.customerEmail} onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })} />
          </div>
          <div>
            <label className="block font-medium">Order ID</label>
            <input required type="text" className="w-full border rounded p-2" value={formData.orderId} onChange={(e) => setFormData({ ...formData, orderId: e.target.value })} />
          </div>
          <div>
            <label className="block font-medium">Item ID</label>
            <input required type="text" className="w-full border rounded p-2" value={formData.itemId} onChange={(e) => setFormData({ ...formData, itemId: e.target.value })} />
          </div>
          <div>
            <label className="block font-medium">Quantity</label>
            <input required type="number" min="1" className="w-full border rounded p-2" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value, 10) })} />
          </div>
          <div>
            <label className="block font-medium">Reason</label>
            <select className="w-full border rounded p-2" value={formData.reason} onChange={(e) => setFormData({ ...formData, reason: e.target.value })}>
              <option value="DAMAGED">DAMAGED</option>
              <option value="WRONG_ITEM">WRONG_ITEM</option>
              <option value="SIZE_ISSUE">SIZE_ISSUE</option>
              <option value="NOT_AS_DESCRIBED">NOT_AS_DESCRIBED</option>
              <option value="CHANGED_MIND">CHANGED_MIND</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded">
              {submitting ? 'Creating...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}