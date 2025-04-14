import NextAuth from "next-auth"
import FaceIt from "next-auth/providers/faceit"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [FaceIt({
        clientId: process.env.FACEIT_CLIENT_ID,
        clientSecret: process.env.FACEIT_CLIENT_SECRET
    })],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async session({ session, user }) {
            session.user.id = user.id
            return session
        }
    }
})