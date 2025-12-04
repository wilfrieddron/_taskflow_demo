import { useDraggable } from "@dnd-kit/core";
import { STATUS_STYLES } from "~/features/tasks/constants";
import type { TaskLike } from "~/features/tasks/types";


interface TaskCardViewProps {
    task: TaskLike;
    onClick?: (task: TaskLike) => void;
}

export function TaskCardView({ task, onClick }: TaskCardViewProps) {
    const taskStatusStyle = STATUS_STYLES[task.status];

    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: task.id,
        data: {
            task:task,
        },
    });

    const style = {
        opacity: isDragging?0:1,
        cursor: "grab"
    }

    const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
        if (isDragging) return;
        onClick?.(task);
    };


    return (
        <article 
            className={`rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm flex flex-col ${taskStatusStyle.card}`}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={handleClick}
        >
            <div className="flex justify-between">
                <span className={`font-medium line-clamp-1 ${taskStatusStyle.title}`}>
                    {task.title}
                </span>
                <span className={`text-[10px] uppercase tracking-wide border rounded-full px-2 py-0.5 ${taskStatusStyle.badge}`}>
                    {task.status}
                </span>
            </div>

            {task.description && (
                <div className="text-xs text-slate-300 mt-1 line-clamp-2">
                    {task.description}
                </div>
            )}
        </article>
    );
}