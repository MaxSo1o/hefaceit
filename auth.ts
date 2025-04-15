import NextAuth from "next-auth"
import FaceIt from "next-auth/providers/faceit"

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [FaceIt({
        clientId: process.env.FACEIT_CLIENT_ID,
        clientSecret: process.env.FACEIT_CLIENT_SECRET,
    })],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ account, profile }) {
            console.log("Sign in callback triggered");
            return true;
        },
        async jwt({ token, account, profile }) {
            if (account) {
                token.accessToken = account.access_token;
                token.refreshToken = account.refresh_token;
                token.providerAccountId = account.providerAccountId;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.providerAccountId = token.providerAccountId;
            return session;
        }
    }

})
