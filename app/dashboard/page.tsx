import {auth, signOut} from "@/auth";

export default function Dashboard() {
    const session = auth()
    console.log(session)

    return (
        <div className="auth-container">
            <div className="box">
                <span>Ваша авторизация прошла успешно</span>
                <button onClick={async () => {
                    "use server"
                    await signOut()
                }}>Выйти</button>
            </div>
        </div>
    )
}