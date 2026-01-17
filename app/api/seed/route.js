import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';
import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';

export async function GET(request) {
    await dbConnect();

    try {
        const leads = [];
        const statuses = ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'];

        for (let i = 0; i < 50; i++) {
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            leads.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                status: status,
                source: faker.helpers.arrayElement(['Website', 'LinkedIn', 'Referral', 'Cold Call', 'Ads']),
                createdAt: faker.date.past({ years: 1 })
            });
        }

        await Lead.insertMany(leads);

        return NextResponse.json({ success: true, message: 'Seeded 50 leads successfully via GET!' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    await dbConnect();

    try {
        // Optional: clear existing leads
        // await Lead.deleteMany({});

        const leads = [];
        const statuses = ['New', 'Contacted', 'Qualified', 'Lost', 'Converted'];

        for (let i = 0; i < 300; i++) {
            const status = statuses[Math.floor(Math.random() * statuses.length)];
            // Determine createdAt based on status to make analytics look realistic? 
            // Or just random.

            leads.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                phone: faker.phone.number(),
                status: status,
                source: faker.helpers.arrayElement(['Website', 'LinkedIn', 'Referral', 'Cold Call', 'Ads']),
                createdAt: faker.date.past({ years: 1 })
            });
        }

        await Lead.insertMany(leads);

        return NextResponse.json({ success: true, message: 'Seeded 300 leads' });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
