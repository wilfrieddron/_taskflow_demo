import { COLUMN_LABELS } from "~/features/tasks/constants";
import type { TaskLike, TaskStatus } from "~/features/tasks/types";
import { TaskCardView } from "./TaskCardView";
import { useDroppable } from "@dnd-kit/core";

interface TaskColumnViewProps {
    tasks: TaskLike[];
    status: TaskStatus;
    title?: string;
    activeTaskId?: string | null;
    isUpdating?: boolean;
    onTaskClick?: (task: TaskLike) => void;
}

export function TaskColumnView({ tasks, status, title, activeTaskId, isUpdating, onTaskClick }: TaskColumnViewProps) {

    const { setNodeRef, isOver } = useDroppable({
        id: status,
    });

    return (
        <section 
            className={`flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-4
            ${isOver? "ring-2 ring-sky-500/70":""}
            ${isUpdating? "opacity-20 animate-pulse":""}`}
            ref={setNodeRef}
        >
            <header className="mb-4 flex justify-between items-center bg-slate-900/80 p-2 rounded-md">
                <h2 className="text-lg font-semibold text-slate-50">
                    {title ?? COLUMN_LABELS[status]}
                </h2>
                <span className="text-xs text-slate-400">
                    {tasks.length}{" "} <span className="text-sky-700"> {tasks.length === 1 ? "_Task_" : "_Tasks_"}</span>
                </span>
            </header>
            
            <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
                {tasks.length === 0 ? (
                    <p className="text-xs text-slate-500 italic">
                        No <span className="text-sky-600">_Tasks_</span> in this column yet.
                    </p>
                ) : (
                    tasks
                    ?.filter((task) => task.id!== activeTaskId)
                    .map((task) => (
                        <TaskCardView 
                            key={task.id} 
                            task={task} 
                            onClick={onTaskClick}
                        />
                    ))
                )}
            </div>
        </section>
    )
}