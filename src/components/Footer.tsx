"use client";

export default function Footer() {
    return(
        <footer className="border-t border-slate-800 py-3 w-full">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
                <p className="text-[11px] text-slate-500">
                    _TaskFlow_ &#169; 2025 - Built by <a className="text-sky-400" href="mailto:wilfried.dron@wmdstrategy.com">Wilfried Dron</a>.
                </p>
                <p className="text-[11px] text-slate-500">
                    Source code available on <a className="text-sky-400" href="">Github</a>
                </p>
            </div>
        </footer>
    );
};