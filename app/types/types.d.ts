import {AdapterSession} from "@auth/core/adapters";

declare module "next-auth" {
    interface Session {
        user: {
            sessionToken?: string
        } & AdapterSession["user"]
    }
}
