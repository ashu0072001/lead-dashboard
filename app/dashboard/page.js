'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Dashboard() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });

    // Filters
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [sort, setSort] = useState('newest');

    // ... (keep analytics state)

    const fetchLeads = async () => {
        setLoading(true);
        setError(null);
        try {
            const query = new URLSearchParams({
                page: pagination.page,
                limit: 10,
                search,
                status,
                sort
            });

            const res = await fetch(`/api/leads?${query.toString()}`);

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`API Error ${res.status}: ${errText}`);
            }

            const data = await res.json();

            if (data.success) {
                setLeads(data.data);
                setPagination({
                    ...pagination,
                    total: data.pagination.total,
                    pages: data.pagination.pages
                });
            } else {
                throw new Error(data.error || 'Unknown API error');
            }
        } catch (error) {
            console.error('Failed to fetch leads', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // ... (rest of code)

    // In the return JSX, update the table body:
    <tbody className="divide-y divide-gray-200">
        {loading ? (
            <tr><td colSpan="5" className="px-6 py-4 text-center text-black">Loading...</td></tr>
        ) : error ? (
            <tr><td colSpan="5" className="px-6 py-4 text-center text-red-600 font-bold">Error: {error}</td></tr>
        ) : leads.length === 0 ? (
            <tr><td colSpan="5" className="px-6 py-4 text-center text-black">No leads found.</td></tr>
        ) : (
            <tr><td colSpan="5" className="px-6 py-4 text-center text-black">No leads found.</td></tr>
        ) : (
                                leads.map((lead) => (
        <tr key={lead._id} className="hover:bg-gray-50 transition">
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    <div className="text-sm text-gray-500">{lead.email}</div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                        ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'Converted' ? 'bg-green-100 text-green-800' :
                            lead.status === 'Lost' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                    {lead.status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lead.source}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(lead.createdAt).toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link href={`/dashboard/${lead._id}`} className="text-indigo-600 hover:text-indigo-900">View</Link>
            </td>
        </tr>
        ))
                            )}
    </tbody>
                    </table >
                </div >

        {/* Pagination */ }
        < div className = "bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6" >
            <div className="flex-1 flex justify-between items-center">
                <button
                    onClick={() => setPagination(p => ({ ...p, page: Math.max(1, p.page - 1) }))}
                    disabled={pagination.page === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Previous
                </button>
                <div className="text-sm text-gray-700">
                    Page <span className="font-medium">{pagination.page}</span> of <span className="font-medium">{pagination.pages}</span>
                </div>
                <button
                    onClick={() => setPagination(p => ({ ...p, page: Math.min(p.pages, p.page + 1) }))}
                    disabled={pagination.page === pagination.pages}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                >
                    Next <ChevronRight className="w-4 h-4 ml-1" />
                </button>
            </div>
                </div >
            </div >
        </div >
    );
}
