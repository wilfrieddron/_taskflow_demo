export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface TaskLike {
    id: string;
    title: string;
    description?: string | null;
    status: TaskStatus;
    order: number;
}