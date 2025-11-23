import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectDB();

      try {
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          await User.create({
            email: user.email,
            name: user.name,
            image: user.image,
            googleId: account.providerAccountId,
          });
        }

        return true;
      } catch (error) {
        console.error('Error during sign in:', error);
        return false;
      }
    },
    async session({ session, token }) {
      if (session.user) {
        await connectDB();
        const dbUser = await User.findOne({ email: session.user.email });
        if (dbUser) {
          session.user.id = dbUser._id.toString();
          session.user.stripeCustomerId = dbUser.stripeCustomerId;
        }
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    strategy: 'jwt',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
