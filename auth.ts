import NextAuth from "next-auth"
import FaceIt from "next-auth/providers/faceit"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [FaceIt({
        clientId: process.env.FACEIT_CLIENT_ID,
        clientSecret: process.env.FACEIT_CLIENT_SECRET,
        issuer: process.env.FACEIT_ISSUER,
    })],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account}) {
            if (account) {
                token.accessToken = account.access_token
            }
            return account
        },
        async session({ session, token }) {
            session.user.accessToken = token.accessToken
            return session
        },
        async signIn({ account }) {
            return !!account;
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("https://hefaceit.ru")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
})

