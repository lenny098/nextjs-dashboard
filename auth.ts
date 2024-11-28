import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { User } from '@/app/lib/definitions';
import { sql } from '@vercel/postgres';
import { compare } from 'bcrypt';

const CredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const getUser = async (email: string): Promise<User | undefined> => {
    try {
        const { rows: [user] } = await sql<User>`
            SELECT * FROM users WHERE email=${email}
        `;

        return user;
    }
    catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
};

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const { success, data } = CredentialsSchema.safeParse(credentials);

                if (!success) return null;

                const { email, password } = data;
                const user = await getUser(email);

                if (!user) return null;

                return await compare(password, user.password) ? user : null;
            }
        }),
    ],
});
