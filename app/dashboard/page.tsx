import {signOut} from "@/auth";

export default function Dashboard() {
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