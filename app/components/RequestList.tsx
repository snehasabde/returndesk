'use client';

interface RequestListProps {
  requests: any[];
  onSelect: (req: any) => void;
  loading: boolean;
}

export default function RequestList({ requests, onSelect, loading }: RequestListProps) {
  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading requests...</div>;
  }

  if (requests.length === 0) {
    return <div className="p-8 text-center text-gray-500">No return requests found.</div>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
        <thead className="bg-gray-50 font-semibold text-gray-700">
          <tr>
            <th className="px-4 py-3">Reference</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Order ID</th>
            <th className="px-4 py-3">Reason</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-800">
          {requests.map((req) => (
            <tr
              key={req.id}
              onClick={() => onSelect(req)}
              className="hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <td className="px-4 py-3 font-medium text-blue-600">{req.reference}</td>
              <td className="px-4 py-3">{req.customerName}</td>
              <td className="px-4 py-3">{req.orderId}</td>
              <td className="px-4 py-3">{req.reason}</td>
              <td className="px-4 py-3">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                  {req.status}
                </span>
              </td>
              <td className="px-4 py-3">{new Date(req.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}