import NextAuth from "next-auth"
import FaceIt from "next-auth/providers/faceit"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [FaceIt({
        clientId: process.env.FACEIT_CLIENT_ID,
        clientSecret: process.env.FACEIT_CLIENT_SECRET
    })],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async jwt({ token, account, user }) {
            // Переносим accessToken из account в token при первом входе
            if (account?.access_token) {
                token.accessToken = account.access_token;
            }

            // Также можно добавить accessToken из user, если он там есть
            if (user?.accessToken) {
                token.accessToken = user.accessToken;
            }

            return token;
        },
        async session({ session, token }) {
            // Добавляем accessToken в сессию
            if (token.accessToken) {
                session.accessToken = token.accessToken;
            }

            return session;
        },
    }
})
