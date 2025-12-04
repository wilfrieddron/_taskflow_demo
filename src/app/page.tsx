"use client";

import { DndContext } from "@dnd-kit/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Footer from "~/components/Footer";
import { KanbanBoardPreview } from "~/components/kanban/KanbanBoardPreview";


export default function HomePage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    
    const isAuthenticated = status === "authenticated";

    const handlePrimaryClick = () => {
        if (isAuthenticated) {
            router.push('/kanban');
        } else {
            router.push("/auth/register");
        }
    };

    const handleSecondaryClick = () => {
        if (isAuthenticated) {
            router.push('/kanban');
        } else {
            router.push("/auth/signin");
        }
    };

    return(
        <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col overflow-hidden">

            {/* Header */}
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
                    <div className="flex items-center gap-3">
                        {!isAuthenticated && (
                            <button
                                onClick={handleSecondaryClick}
                                type="button"
                                className="text-xs font-medium text-slate-300 hover:text-sky-300">
                                Sign In
                            </button>
                        )}
                        <button
                            onClick={handlePrimaryClick}
                            type="button"
                            className="rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-slate-50 hover:bg-sky-500 transition-colors">
                            {isAuthenticated ? 'Open your Flow' : 'Get Started'}
                        </button>
                    </div>
                </div>
            </header>
            
            {/* Main Content */}
            <section className="flex-1">
                <div className="mx-auto flex max-w-6xl flex-col justify-top gap-10 px-4 py-10 md:flex-row md:items-center">
                    <div className="flex-1 space-y-5">

                        {/* Hero Text */}
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-sky-400">
                            Welcome to _TaskFlow_ - Minimal Kanban for focused work
                        </p>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-50">
                            { isAuthenticated && (
                                <span className="block text-sky-400">{`${session.user.name}`}</span>
                            )}
                            <span className="block text-slate-50">Organize your tasks,</span>
                            <span className="block text-slate-50">
                                stay in your{" "} 
                                <span className="text-sky-400">_Flow_</span>
                            </span>
                        </h1>
                        <p className="max-w-xl text-sm md:text-base text-slate-300">
                            <span className="text-sky-400">_TaskFlow_</span> is a simple &amp; fast KanBan. Design to demonstrate my skills, it helps you create tasks, drag and drop them across columns, and quickly visualize your workflow.
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={handlePrimaryClick}
                                type="button"
                                className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-slate-50 hover:bg-sky-500 transition-colors"
                            >
                                {isAuthenticated ? 'Open your Flow' : 'Get Started'}
                            </button>
                            {!isAuthenticated && (
                                <button
                                    onClick={handleSecondaryClick}
                                    type="button"
                                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:border-sky-500/70 transition-colors">
                                    I already have an account
                                </button>
                            )}
                        </div>
                        
                        {/* Features List & Description */}
                        <div className="mt-4 grid gap-2 text-xs text-slate-400 md:text-sm">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-400"/>
                                <span>Drag &amp; drop between columns with DND; </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-400"/>
                                <span>Secured authentication with NextAuth;</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-400"/>
                                <span>Modern stack: T3, tRPC, Prisma, MongoDB, Tailwind;</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-emerald-400"/>
                                <span>Public repository on <a className="text-sky-400" href="">Github</a></span>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="flex-1">
                            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-sky-900/40">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-xs font-medium text-slate-300">
                                        _TaskFlow_
                                    </span>
                                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">
                                        [Preview]
                                    </span>
                                </div>
                                    <DndContext>
                                        <KanbanBoardPreview />
                                    </DndContext>
                                <p className="mt-3 text-[11px] text-slate-500">
                                    Simplified preview, login to access full features.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />                            
        </main>
    ) 

}