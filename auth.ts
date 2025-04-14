import NextAuth from "next-auth"
import FACEIT from "@auth/core/providers/faceit";

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [FACEIT ({
        clientId: process.env.FACEIT_CLIENT_ID,
        clientSecret: process.env.FACEIT_CLIENT_SECRET
    })],
    secret: process.env.AUTH_SECRET
})