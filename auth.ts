import NextAuth from "next-auth"
import { OAuthConfig } from "next-auth/providers"
import type { Profile } from "next-auth"

const FaceItProvider = {
    id: "faceit",
    name: "FaceIt",
    type: "oauth",
    version: "2.0",
    issuer: "https://api.faceit.com/auth",
    authorization: "https://accounts.faceit.com",
    token: "https://api.faceit.com/auth/v1/oauth/token",
    userinfo: "https://api.faceit.com/auth/v1/resources/userinfo",
    jwks_endpoint:'https://api.faceit.com/auth/v1/oauth/certs',
    clientId: process.env.FACEIT_CLIENT_ID,
    clientSecret: process.env.FACEIT_CLIENT_SECRET,
    profile(profile) {
        return {
            id: profile.player_id,
            name: profile.nickname,
            email: profile.email || null,
            image: profile.avatar || null
        }
    }
} satisfies OAuthConfig<Profile>

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [FaceItProvider],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ account, profile }) {
            console.log("✅ signIn", account, profile)
            return true
        },
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token
                token.providerAccountId = account.providerAccountId
            }
            return token
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken
            session.providerAccountId = token.providerAccountId
            return session
        },
    }
})
