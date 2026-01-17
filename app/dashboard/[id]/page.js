'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Calendar, User, Tag, Trash2 } from 'lucide-react';

export default function LeadDetail({ params }) {
    const router = useRouter();
    const { id } = params;
    const [lead, setLead] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchLead();
    }, [id]);

    const fetchLead = async () => {
        try {
            const res = await fetch(`/api/leads/${id}`);
            const data = await res.json();
            if (data.success) {
                setLead(data.data);
            } else {
                setError(data.error || 'Failed to load lead');
            }
        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (newStatus) => {
        try {
            const res = await fetch(`/api/leads/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            if (data.success) {
                setLead(data.data);
            }
        } catch (err) {
            console.error('Failed to update status', err);
        }
    };

    const deleteLead = async () => {
        if (!confirm('Are you sure you want to delete this lead?')) return;

        try {
            const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                router.push('/dashboard');
            }
        } catch (err) {
            alert('Failed to delete lead');
        }
    };

    if (loading) return <div className="p-8 text-center text-black">Loading...</div>;
    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!lead) return <div className="p-8 text-center text-black">Lead not found</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <Link href="/dashboard" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6">
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
            </Link>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                {/* Header */}
                <div className="bg-slate-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">{lead.name}</h1>
                        <p className="text-sm text-gray-500">ID: {lead._id}</p>
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={lead.status}
                            onChange={(e) => updateStatus(e.target.value)}
                            className="border border-gray-300 rounded px-3 py-1 bg-white text-sm text-black"
                        >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Lost">Lost</option>
                            <option value="Converted">Converted</option>
                        </select>
                        <button onClick={deleteLead} className="text-red-500 hover:text-red-700 p-1">
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center text-gray-700">
                            <Mail className="w-5 h-5 mr-3 text-gray-400" />
                            <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <Phone className="w-5 h-5 mr-3 text-gray-400" />
                            <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <User className="w-5 h-5 mr-3 text-gray-400" />
                            <span>Source: {lead.source}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                            <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                            <span>Created: {new Date(lead.createdAt).toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-medium text-gray-900 mb-2">Notes</h3>
                        <p className="text-gray-500 text-sm">
                            No notes available for this lead yet. (Feature placeholder)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
