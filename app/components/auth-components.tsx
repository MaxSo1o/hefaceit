// import Image from "next/image";
// import {auth} from "@/auth";
// import {SignIn} from "@/app/components/ButtonAuth";
//
// export default async function Profile() {
//     const session = await auth()
//
//     if (!session?.user) {
//         return <SignIn/>
//     }
//
//     return (
//         <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
//             <div className="flex items-center gap-4 mb-4">
//             <Image
//                     src={`${session.user?.image}`}
//                     alt="Аватар"
//                     className="w-16 h-16 rounded-full"
//                     width={64}
//                     height={64}
//                 />
//                 <div>
//                     <h2 className="text-xl font-bold">{session.user?.name}</h2>
//                     <p className="text-gray-600">{session.user?.email}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }
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