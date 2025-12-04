"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function AuthBar() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return (
            <div className="mb-6 text-sm text-slate-400">
                Session is being verified
            </div>
        );
    }

    // When user isn't connected
    if(!session) {
        return (
            <header className="w-full border-b border-slate-800">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-sky-500/80 flex items-center justify-center text-xs font-bold">
                        TF
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-slate-100">
                        _TaskFlow_
                    </span>

                </div>
                    <button
                        className="rounded-lg bg-sky-600 px-3 py-1.5 text-sm font-medium hover:bg-sky-500"
                        type="button"
                        onClick={() => router.push("/auth/signin")}
                    >
                        Login
                    </button>
                </div>
            </header>
        );
    }

    return(
        <header className="w-full border-b border-slate-800">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-sky-500/80 flex items-center justify-center text-xs font-bold">
                        TF
                    </div>
                    <span className="text-sm font-semibold tracking-tight text-slate-100">
                        _TaskFlow_
                    </span>

                </div>
                    <p className="text-sm text-slate-300">
                        Connected as{" "}
                        <span className="font-medium text-sky-300">
                            {session.user?.name ?? session.user?.email}
                        </span>
                    </p>
                <button
                    className="rounded-lg bg-sky-400/20 px-3 py-1.5 text-sm font-medium hover:bg-sky-500"
                    type="button"
                    onClick={() => signOut({ callbackUrl: '/', redirect:true })}
                >
                    Logout
                </button>

            </div>
        </header>
    );
}