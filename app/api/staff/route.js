import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Staff from '@/models/Staff';

// GET - Fetch all active staff members
export async function GET() {
  try {
    await connectDB();

    const staff = await Staff.find({ isActive: true }).sort({ name: 1 });

    return NextResponse.json({ staff }, { status: 200 });
  } catch (error) {
    console.error('Error fetching staff:', error);
    return NextResponse.json(
      { error: 'Failed to fetch staff members' },
      { status: 500 }
    );
  }
}

// POST - Create new staff member (admin only)
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, role, specialty, age, gender, bio, image, funFact } = body;

    const newStaff = await Staff.create({
      name,
      role,
      specialty,
      age,
      gender,
      bio,
      image,
      funFact,
    });

    return NextResponse.json({ staff: newStaff }, { status: 201 });
  } catch (error) {
    console.error('Error creating staff:', error);
    return NextResponse.json(
      { error: 'Failed to create staff member' },
      { status: 500 }
    );
  }
}
