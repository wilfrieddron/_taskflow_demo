"use client";

import { useRef, useState } from "react";
import { type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    
    const [fieldErrors, setFieldErrors] = useState<{ 
            name?: string; 
            email?:string; 
            password?:string 
        }>({});

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        setFieldErrors({});

        const inputErrors: { 
            name?: string; 
            email?:string; 
            password?:string 
        } = {};


        const form = formRef.current;
        if (!form) {
            setError("Form not found");
            setLoading(false);
            return;
        }

        const valid = form.checkValidity();

        if (!valid) {
            
            const invalidField = form.querySelector(":invalid")! as HTMLInputElement | null;

            if (invalidField === null) {
                setError("Form is invalid");
                setLoading(false);
                return;
            }
            
            setFieldErrors({
                [invalidField.name]: invalidField.validationMessage,
            });

            console.log(invalidField)
            
            //invalidField.focus();
            
            setLoading(false);
            
            return;
        }

        if (!name.trim()) {
            inputErrors.name = "Name is required";
        }

        if (!email.trim()) {
            inputErrors.email = "Email is required";
        } else if (!email.includes("@")) {
            inputErrors.email = "Please enter a valid email format";
        }

        if (password.length < 8) {
            inputErrors.password = "Password must be at least 8 characters long";
        }

        if (Object.keys(inputErrors).length > 0) {
            setFieldErrors(inputErrors);
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password, name}),
            });

            const data = await res.json() as { error?: string };

            if(!res.ok) {
                setError(data.error ?? "Error while creating the account");
                setLoading(false);
                return;
            }

            await signIn("credentials", {
                email,
                password,
                redirect: true,
                callbackUrl: "/kanban",
            });

        } catch (err) {
            console.log(err);
            setError("Unexpected Error");
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl">
                <h1 className="text-2xl font-semibold text-slate-50 mb-2">
                    Create an account
                </h1>
                <p className="text-sm text-slate-400 mb-6">
                    Register with your email to access your Kan-Ban.
                </p>

                {error && (
                    <div className="mb-4 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                        {error}
                    </div>
                )}

                <form 
                    className="flex flex-col gap-3" 
                    onSubmit={handleSubmit}
                    ref={formRef}
                    noValidate
                >
                    <input 
                        type="text"
                        name="name"
                        placeholder="Name"
                        className={`rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2
                            ${fieldErrors.name ? "border border-red-500 focus:ring-red-500" : " focus:ring-sky-500"}    
                        `}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {fieldErrors.name && (
                        <p className="text-xs text-red-400">{fieldErrors.name}</p>
                    )}
                    <input 
                        type="text"
                        name="email"
                        placeholder="Email"
                        className={`rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2
                            ${fieldErrors.email ? "border border-red-500 focus:ring-red-500" : " focus:ring-sky-500"}
                        `}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {fieldErrors.email && (
                        <p className="text-xs text-red-400">{fieldErrors.email}</p>
                    )}
                    <input 
                        type="password"
                        name="password"
                        placeholder="Password (min. 8 chars)"
                        className={`rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2
                            ${fieldErrors.password ? "border border-red-500 focus:ring-red-500" : " focus:ring-sky-500"}
                        `}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {fieldErrors.password && (
                        <p className="text-xs text-red-400">{fieldErrors.password}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-sky-500 disabled:opacity-50"
                    >
                        {loading? "Creating...":"Create Now"}
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

                <p className="mt-4 text-xs text-slate-400">
                    Already having an account?{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/auth/signin")}
                        className="text-sky-400 hover:underline"
                    >
                        Login instead
                    </button>
                </p>
            </div>
        </main>
    );
}