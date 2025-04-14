'use client'
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
    const { data: session } = useSession();

    if (!session) {
        return <p>Вы не авторизованы</p>;
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
                <Image
                    src={session.user?.image}
                    alt="Аватар"
                    className="w-16 h-16 rounded-full"
                    width={64}
                    height={64}
                />
                <div>
                    <h2 className="text-xl font-bold">{session.user?.name}</h2>
                    <p className="text-gray-600">{session.user?.email}</p>
                </div>
            </div>

            <button
                onClick={() => signOut()}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
            >
                Выйти
            </button>
        </div>
    );
}