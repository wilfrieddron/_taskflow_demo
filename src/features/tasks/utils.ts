import type { TaskStatus } from "~/features/tasks/types";

export const getNextStatus = (status: TaskStatus): TaskStatus | null => {
    switch (status){
        case "TODO":
            return "IN_PROGRESS";
        case "IN_PROGRESS":
            return "DONE";
        case "DONE":
        default:
            return null;
    }
};