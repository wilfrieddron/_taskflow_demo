import type { TaskLike } from "~/features/tasks/types";
import { TaskColumnView } from "../tasks/TaskColumnView";

interface KanbanBoardViewProps {
    tasks: TaskLike[];
    activeTaskId?: string | null;
    isUpdating?: boolean;
    onTaskClick?: (task: TaskLike) => void;
}

export function KanbanBoardView({ tasks, activeTaskId, isUpdating, onTaskClick }: KanbanBoardViewProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Render TaskColumnView for each status */}
            <TaskColumnView
                status="TODO"
                tasks={tasks.filter((task) => task.status === "TODO")}
                activeTaskId={activeTaskId}
                isUpdating={isUpdating}
                onTaskClick={onTaskClick}
            />
            <TaskColumnView
                status="IN_PROGRESS"
                tasks={tasks.filter((task) => task.status === "IN_PROGRESS")}
                activeTaskId={activeTaskId}
                isUpdating={isUpdating}
                onTaskClick={onTaskClick}
            />
            <TaskColumnView
                status="DONE"
                tasks={tasks.filter((task) => task.status === "DONE")}
                activeTaskId={activeTaskId}
                isUpdating={isUpdating}
                onTaskClick={onTaskClick}
            />
        </div>
    );
}