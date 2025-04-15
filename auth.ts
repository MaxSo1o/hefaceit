import NextAuth from "next-auth"
import FaceIt from "next-auth/providers/faceit"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [FaceIt({
        clientId: process.env.FACEIT_CLIENT_ID,
        clientSecret: process.env.FACEIT_CLIENT_SECRET,
        issuer: 'https://api.faceit.com/auth',
        userinfo: 'https://api.faceit.com/auth/v1/resources/userinfo',
        jwks_endpoint: 'https://api.faceit.com/auth/v1/oauth/certs',
        token: 'https://api.faceit.com/auth/v1/oauth/token',
        authorization: 'https://accounts.faceit.com',
        redirectProxyUrl: 'https://hefaceit.ru/api/auth/callback/faceit'
    })],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, trigger, session, account }) {
            console.log ("jwt", token, trigger, session, account)
            if (trigger === "update") token.name = session.user.name
            if (account?.provider === "faceit") {
                return { ...token, accessToken: account.access_token }
            }
            return token
        },
        async session({ session, token }) {
            if (token?.accessToken) session.accessToken = token.accessToken
            return session
        },
    },
})
