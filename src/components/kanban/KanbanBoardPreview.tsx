"use client";

import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { useState } from "react";
import type { TaskLike, TaskStatus } from "~/features/tasks/types";
import { KanbanBoardView } from "./KanbanBoardView";
import { TaskCardView } from "../tasks/TaskCardView";

// Fake tasks for landing page demo
const INITIAL_TASKS: TaskLike[] = [
    {
        id: "demo-1",
        title: "ITW Presentation script",
        description: "Draft the script for the interview presentation",
        status: "TODO",
        order: 1,
    },
    {
        id: "demo-4",
        title: "Add _TaskFlow_ to portfolio",
        status: "TODO",
        order: 2,
    },
    {
        id: "demo-2",
        title: "Clean the repo",
        description: "Add meaningful comment and clean up the codebase to prepare for public view",
        status: "IN_PROGRESS",
        order: 1,
    },
    {
        id: "demo-3",
        title: "Create the demo tasks",
        description: "Create demo tasks for the landing page",
        status: "DONE",
        order: 1,
    },
    {
        id: "demo-5",
        title: "Share my _Flow_",
        description: "Share _TaskFlow_ with my network",
        status: "TODO",
        order: 3,
    },
    {
        id: "demo-6",
        title: "Refactor _Task_ API",
        status: "DONE",
        order: 2,
    },
    {
        id: "demo-7",
        title: "UI polish & spacing",
        description: "Align paddings & typography",
        status: "IN_PROGRESS",
        order: 2,
    },
];

// Kanban board with the same UX as the main app, but with demo tasks
// No backend interaction
export function KanbanBoardPreview() {
    const [tasks, setTasks] = useState<TaskLike[]>(INITIAL_TASKS);
    const [activeTask, setActiveTask] = useState<TaskLike | null>(null);

    const handleDragStart = (e: DragStartEvent) => {
        const task = tasks.find((t) => t.id === e.active.id) ?? null;
        setActiveTask(task);
    };

    const handleDragEnd = (e: DragEndEvent) => {
        const { active, over } = e;
        if(!over) {
            setActiveTask(null);
            return;
        }

        const taskId = active.id;
        const newStatus = over.id as TaskStatus;

        setTasks((prevTasks) =>
            prevTasks.map((t) =>
                t.id === taskId ? { ...t, status: newStatus } : t
            )        
        );

        setActiveTask(null);
    };

    return (
        <DndContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <KanbanBoardView 
                tasks={tasks} 
                activeTaskId={activeTask?.id ?? null}
                isUpdating={false}
            />

            <DragOverlay dropAnimation={null}>
                {activeTask && <TaskCardView task={activeTask} />}
            </DragOverlay>
        </DndContext>
    );
}