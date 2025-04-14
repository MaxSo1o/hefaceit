
import { signIn } from "@/auth"

export default function SignIn() {
    return (
        <form
            action={async () => {
                "use server"
                await signIn("faceit")
            }}
        >
            <button type="submit">Signin with FACEIT</button>
        </form>
    )
} 