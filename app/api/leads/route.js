import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';
import { NextResponse } from 'next/server';

export async function GET(request) {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const sort = searchParams.get('sort') || 'newest';
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Build query
    const query = {};

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'iSource' } }, // Assuming typical search fields
        ];
    }

    if (status && status !== 'All') {
        query.status = status;
    }

    // Build sort
    let sortOption = {};
    if (sort === 'newest') {
        sortOption = { createdAt: -1 };
    } else if (sort === 'oldest') {
        sortOption = { createdAt: 1 };
    } else if (sort === 'name_asc') {
        sortOption = { name: 1 };
    } else if (sort === 'name_desc') {
        sortOption = { name: -1 };
    }

    try {
        const leads = await Lead.find(query)
            .sort(sortOption)
            .skip(skip)
            .limit(limit);

        const total = await Lead.countDocuments(query);

        return NextResponse.json({
            success: true,
            data: leads,
            pagination: {
                total,
                page,
                limit,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(request) {
    await dbConnect();

    try {
        const body = await request.json();
        const lead = await Lead.create(body);
        return NextResponse.json({ success: true, data: lead }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
