import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = Boolean(auth?.user);

            if (nextUrl.pathname.startsWith('/dashboard')) return isLoggedIn;
            if (isLoggedIn) return Response.redirect(new URL('/dashboard', nextUrl));

            return true;
        }
    },
    providers: [],
} satisfies NextAuthConfig;
