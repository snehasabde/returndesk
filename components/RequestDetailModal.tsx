'use client';

interface RequestDetailModalProps {
  request: any | null;
  onClose: () => void;
}

export default function RequestDetailModal({ request, onClose }: RequestDetailModalProps) {
  if (!request) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-6 relative space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold text-gray-900">Request: {request.reference}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
        </div>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Customer Name:</strong> {request.customerName}</p>
          <p><strong>Customer Email:</strong> {request.customerEmail}</p>
          <p><strong>Order ID:</strong> {request.orderId}</p>
          <p><strong>Item ID:</strong> {request.itemId}</p>
          <p><strong>Quantity:</strong> {request.quantity}</p>
          <p><strong>Reason:</strong> {request.reason}</p>
          <p><strong>Status:</strong> {request.status}</p>
          {request.resolution && <p><strong>Resolution:</strong> {request.resolution}</p>}
          {request.refundAmount && <p><strong>Refund Amount:</strong> ${request.refundAmount}</p>}
        </div>
        <div className="border-t pt-3">
          <h3 className="font-semibold mb-2">Notes</h3>
          <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
            {request.notes?.map((n: any) => (
              <li key={n.id}>{n.content}</li>
            ))}
          </ul>
        </div>
        <button onClick={onClose} className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900">
          Close
        </button>
      </div>
    </div>
  );
}