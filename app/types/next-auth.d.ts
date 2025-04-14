import "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken: object; // Теперь точно string, а не optional
        user: {
            id: string;
        } & DefaultSession["user"];
    }

    interface User {
        accessToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken: string;
    }
}