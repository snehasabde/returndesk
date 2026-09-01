'use client';

import { useState, useEffect } from 'react';
import RequestList from '@/app/components/RequestList';
import RequestDetailModal from '@/app/components/RequestDetailModal';
import CreateRequestModal from '@/app/components/CreateRequestModal';

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/requests?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setRequests(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [search]);

  return (
    <main className="min-h-screen bg-gray-50 p-8 space-y-6 text-gray-900">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">ReturnDesk Dashboard</h1>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium"
          >
            + New Return Request
          </button>
        </header>

        <input
          type="text"
          placeholder="Search by customer, email, order, or reference..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm text-gray-900 bg-white"
        />

        <RequestList requests={requests} onSelect={setSelectedRequest} loading={loading} />

        <RequestDetailModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />
        <CreateRequestModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreated={fetchRequests}
        />
      </div>
    </main>
  );
}