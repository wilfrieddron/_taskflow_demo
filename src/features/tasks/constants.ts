import type { TaskStatus } from "./types";

export const COLUMN_LABELS: Record<TaskStatus, string> = {
    TODO: "To Do",
    IN_PROGRESS: "In Progress",
    DONE: "Done",
};

export const STATUS_STYLES: Record<TaskStatus,{card: string; badge: string; title: string;}> = {
    TODO: {
        card: "border-sky-700/60",
        badge: "text-sky-300 border-sky-500/60",
        title: "text-sky-300",
    },
    IN_PROGRESS: {
        card: "border-amber-700/60",
        badge: "text-amber-300 border-amber-500/60",
        title: "text-amber-200",
    },
    DONE: {
        card: "border-emerald-700/60",
        badge: "text-emerald-300 border-emerald-500/60",
        title: "text-emerald-300",
    },
};
