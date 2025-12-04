"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";


const errorMessages: Record<string, string> = {
    OAuthSignin: "Could not connect to the provider. Please try again.",
    OAuthCallback: "Login failed. Please try again.",
    OAuthAccountNotLinked: "This email is already used with another login method. Please use the same provider.",
    CredentialsSignin: "Invalid email or password.",
    Default: "Something went wrong. Please try again. If the error persists, contact support.",
};

function SignInPageContent() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const errorParam = searchParams.get("error");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(
        errorParam? errorMessages[errorParam] ?? errorMessages.Default! : null
    );

    const [loading, setLoading] = useState(false);

    const handleCredentialsLogin = async (e: React.FormEvent) => {
        
        e.preventDefault();
        setError(null);
        setLoading(true);

        //Trying to log in with the provided info
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        //If failed, filled error and exit
        if(res?.error){
            setError("Incorrect email or password");
            setLoading(false);
            return;
        }

        router.push("/kanban");
    }

    return(
        <main className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl">
                <h1 className="text-2xl font-semibold text-slate-50 mb-2"> 
                    Connection
                </h1>
                <p className="text-sm text-slate-400 mb-6">
                    Log in to access your Kan Ban
                </p>

                {error && (
                    <div className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                        {error}
                    </div>
                )}

                {/* Our own credential manager */}
                <form className="flex flex-col gap-3" onSubmit={handleCredentialsLogin}>
                    <input 
                        type="text"
                        placeholder="Email"
                        className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-sky-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password"
                        placeholder="Password (min. 8 chars)"
                        className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-sky-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button 
                        type="submit"
                        disabled={loading}
                        className="mt-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-sky-500 disabled:opacity-50"
                    >
                        {loading?"Loging in..." : "Log in"}
                    </button>
                </form>

                {/* Github & Google */}
                <div className="mt-6 flex flex-col gap-2">
                    <p className="text-xs text-slate-500">or select:</p>
                    <button
                        type="button"
                        onClick={() => signIn("github", {callbackUrl: "/"})}
                        className="w-full rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-50 hover:bg-slate-700"
                    >
                        GitHub
                    </button>
                    <button
                        type="button"
                        onClick={() => signIn("google", {callbackUrl: "/"})}
                        className="w-full rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-slate-50 hover:bg-slate-700"
                    >
                        Google
                    </button>
                </div>

                {/* Or create an account if you don't have one already */}
                <p className="mt-4 text-xs text-slate-400">
                    Not registered yet?{" "}
                    <button
                        type="button"
                        onClick={()=> router.push("/auth/register")}
                        className="text-sky-400 hover:underline"
                    >
                        Create an account
                    </button>
                </p>
            </div>
        </main>
    );
}

export default function SignInPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-slate-950 flex items-center justify-center">
                <p className="text-slate-400">Loading sign in page...</p>
            </main>
        }>
            <SignInPageContent />
        </Suspense>
    );
}