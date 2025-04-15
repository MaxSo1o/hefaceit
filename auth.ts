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
        authorization: 'https://accounts.faceit.com'
    })],
    callbacks: {
        async jwt({ token, account }) {
            console.log ("jwt", token, account)
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
    }
})
