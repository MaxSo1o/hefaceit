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
        async jwt({ token, account, profile }) {
            // Первоначальная авторизация - сохраняем данные от Faceit
            if (account) {
                token.accessToken = account.access_token
                token.expiresAt = account.expires_at
                token.refreshToken = account.refresh_token

                // Добавляем данные профиля из Faceit
                if (profile) {
                    token.faceitId = profile.player_id
                    token.avatar = profile.avatar
                    token.nickname = profile.nickname
                }
            }

            // Здесь можно добавить логику обновления токена, если он истек
            // ...

            return token
        },
        async session({ session, token }) {
            // Передаем данные из токена в сессию
            session.accessToken = token.accessToken
            session.user.faceitId = token.faceitId
            session.user.image = token.avatar
            session.user.name = token.nickname

            return session
        },
        async redirect({ url, baseUrl }) {
            // Обработка redirect после авторизации
            if (url.startsWith("/")) return `${baseUrl}${url}`
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    }
})
