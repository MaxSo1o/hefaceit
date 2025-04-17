import {auth, signOut} from "@/auth";

export default function Dashboard() {
    const session = auth()

    return (
        <div className="auth-container">
            <div className="box">
                <span>Ваша авторизация прошла успешно {session?.user,.name}</span>
                <button onClick={async () => {
                    "use server"
                    await signOut()
                }}>Выйти</button>
            </div>
        </div>
    )
}