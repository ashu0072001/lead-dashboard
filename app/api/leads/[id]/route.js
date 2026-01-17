import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    await dbConnect();
    const { id } = params;

    try {
        const lead = await Lead.findById(id);
        if (!lead) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: lead });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function PUT(request, { params }) {
    await dbConnect();
    const { id } = params;
    const body = await request.json();

    try {
        const lead = await Lead.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });
        if (!lead) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: lead });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(request, { params }) {
    await dbConnect();
    const { id } = params;

    try {
        const deletedLead = await Lead.deleteOne({ _id: id });
        if (!deletedLead) {
            return NextResponse.json({ success: false, error: 'Lead not found' }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: {} });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
