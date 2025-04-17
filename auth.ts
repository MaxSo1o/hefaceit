import NextAuth from "next-auth"
import FaceIt from "next-auth/providers/faceit"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        FaceIt({
            clientId: process.env.FACEIT_CLIENT_ID,
            clientSecret: process.env.FACEIT_CLIENT_SECRET,
            issuer: process.env.FACEIT_ISSUER,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                return {
                    ...token,
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    refresh_token: account.refresh_token,
                }
            } else if (Date.now() < token.expires_at * 1000) {
                console.log('Токен еще актуален')
                return token
            } else {
                console.log('Обновляем токен')
                return token
            }
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    access_token: token.access_token,
                    expires_at: token.expires_at,
                    refresh_token: token.refresh_token,
                },
            }
        },
        async redirect({ url, baseUrl }) {
            if (url.startsWith("/dashboard")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },
})