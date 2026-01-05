// app/dashboard/page.js
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import BookedSession from '@/models/BookedSession';
import Purchase from '@/models/Purchase';
import DashboardClient from '../components/DashboardClient';

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/');
  }

  await connectDB();
  const dbUser = await User.findOne({ email: user.email });

  // Get upcoming booked sessions
  const sessions = await BookedSession.find({
    userId: dbUser._id,
    scheduledDate: { $gte: new Date() },
    status: 'scheduled',
  })
    .sort({ scheduledDate: 1 })
    .limit(10)
    .lean();

  // Get active purchases
  const purchases = await Purchase.find({
    userId: dbUser._id,
    status: 'active',
    sessionsRemaining: { $gt: 0 },
  }).lean();

  const totalSessions = purchases.reduce(
    (sum, p) => sum + p.sessionsRemaining,
    0
  );

  // Convert MongoDB ObjectIds to strings
  const serializedSessions = sessions.map((session) => ({
    ...session,
    _id: session._id.toString(),
    userId: session.userId.toString(),
    purchaseId: session.purchaseId.toString(),
    scheduledDate: session.scheduledDate.toISOString(),
  }));

  const serializedPurchases = purchases.map((purchase) => ({
    ...purchase,
    _id: purchase._id.toString(),
    userId: purchase.userId.toString(),
    expiresAt: purchase.expiresAt ? purchase.expiresAt.toISOString() : null,
  }));

  return (
    <DashboardClient
      userName={user.name}
      totalSessions={totalSessions}
      sessions={serializedSessions}
      purchases={serializedPurchases}
    />
  );
}
