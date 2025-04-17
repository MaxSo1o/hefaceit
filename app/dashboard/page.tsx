import {auth, signOut} from "@/auth";

export default function Dashboard() {
    const session = auth()

    if (!session) {
        return (
            <div className="auth-container">
                Вы авторизованы {session.user?.nickname}
            </div>
        )
    }

    return (
        <div className="auth-container">
            <div className="box">
                <button onClick={async () => {
                    "use server"
                    await signOut()
                }}>Выйти</button>
            </div>
        </div>
    )
}