"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";

import { AuthBar } from "~/components/AuthBar";
import { NewTaskForm } from "~/components/tasks/NewTaskForm";
import { api } from "~/trpc/react";
import type { TaskStatus } from "~/features/tasks/types";
import type { TaskLike } from "~/features/tasks/types";
import { useRouter } from "next/navigation";
import { KanbanBoardView } from "~/components/kanban/KanbanBoardView";
import { TaskCardView } from "~/components/tasks/TaskCardView";
import Footer from "~/components/Footer";
import { EditTaskModal } from "~/components/tasks/EditTaskModal";

export default function KanBanPage() { 
    const [mounted, setMounted] = useState(false);
    const [activeTask, setActiveTask] = useState<TaskLike | null>(null);
    const [isUpdatingTasks, setIsUpdatingTasks] = useState(false);
    const [editingTask, setEditingTask] = useState<TaskLike | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const utils = api.useUtils();
    const router = useRouter();

    const {status} = useSession();
    const {data: tasks = []} = api.task.all.useQuery() as {data: TaskLike[];};

    // Wait for the component to be mounted to avoid hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    // TRPC mutations
    // Handle task updates and allows to reset the cache, Modal & EditingTask state on success
    const updateTask = api.task.update.useMutation({
        onSuccess: async () => {
            await utils.task.all.invalidate();
            setIsModalOpen(false);
            setEditingTask(null);
        },
    });

    // TRPC mutations
    // Handle task deletion and allows to reset the cache, Modal & EditingTask state on success
    const deleteTask = api.task.delete.useMutation({
        onSuccess: async () => {
            await utils.task.all.invalidate();
            setIsModalOpen(false);
            setEditingTask(null);
        },
    });

    // TRPC mutations
    // Handle status update when a task is dragged and dropped to a new column
    const updateStatus = api.task.updateStatus.useMutation({
        onMutate: () => {
            setIsUpdatingTasks(true);
        },
        // Wait for the mutation to complete, then invalidate the tasks query to refetch updated data
        // (i) => it avoids screen flickering
        onSettled: async () => {
            await utils.task.all.invalidate();
            setIsUpdatingTasks(false);
            setActiveTask(null);
        },
    });

    // Handle task card click to open the editing modal
    const handleTaskClick = (task: TaskLike) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    // Handle saving task updates
    const handleSaveTask = (data: {
        id: string;
        title: string;
        description?: string;
        status: TaskStatus;
        order: number;
    }) => {
        updateTask.mutate({
            id: data.id,
            title: data.title,
            description: data.description,
            status: data.status,
            order: data.order,
        });
    };

    // Handle deleting a task
    const handleDeleteTask = (taskId: string) => {
        deleteTask.mutate({ id: taskId });
    };

    // Handle the start of a drag event
    const handleDragStart = (e: DragStartEvent) => {
        const task = tasks.find((t) => t.id === e.active.id);
        //Memorize the task that is being dragged
        setActiveTask(task ?? null);
    }

    // Handle the end of a drag event
    const handleDragEnd = (e : DragEndEvent) => {
        const { active, over } = e;

        // If we are not over a valid drop area, exit
        if(!over) return;
        
        const dragged = tasks.find((t) => t.id === active.id);
        const newStatus = over.id as TaskStatus;

        // If we don't have a dragged task, exit
        if(!dragged) return;

        // If we have a task and its status has not changed, reset activeTask and exit
        if(dragged.status === newStatus){
            setActiveTask(null);
            return;
        }

        // Otherwise, we have a valid status change, so we update the task status
        updateStatus.mutate({
            id: dragged.id,
            status: newStatus,
        });
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5, },   
        }),
    );

    if(status !== "authenticated"){
        return (
            <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center">
                <AuthBar />
                <section className="flex-1">
                    <div className="w-full max-w-6xl px-4S py-10">
                        <p className="mt-4 text-4xl text-slate-100 text-center">
                            Oops, looks like you are not connected :(
                        </p>
                        <p className="mt-4 text-md text-slate-400 text-center">
                            Please{" "}
                            <span>
                                <button 
                                    type="button" 
                                    onClick={() => {router.push("/auth/signin")}}
                                    className="text-sky-400 hover:underline hover:cursor-pointer"
                                >
                                    Login
                                </button>
                            </span> 
                            {" "}to access your{" "}
                                <button 
                                    type="button"
                                    onClick={() => {router.push("/")}}
                                    className="text-sky-400 hover:underline hover:cursor-pointer"
                                >
                                    _Tasks_
                                </button>
                        </p>
                    </div>
                </section>
                <Footer />
            </main>
        );
    }

    // If not mounted yet, show loading state
    if(!mounted){
        return (
            <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center ">
                <AuthBar />
                <section className="flex-1">
                    <div className="w-full max-w-6xl px-4 py-10">
                        <p className="mt-4 text-xl text-slate-400">Loading your{" "}<span className="text-sky-400">_TaskFlow_</span>, please wait</p>
                    </div>
                </section>
                <Footer />
                {/* Footer */} 
            </main>
        );
    }

    return(
        <>
        <main className="min-h-screen  bg-slate-950 text-slate-100 flex flex-col items-center">
            <AuthBar />
            <section className="flex-1 w-full max-w-6xl">
                <div className="px-4 py-10">
                    <DndContext 
                        sensors={sensors}
                        onDragEnd={handleDragEnd}
                        onDragStart={handleDragStart}
                    >
                        <h1 className="text-3xl font-bold mb-10">Your <span className="text-sky-400">_TaskFlow_</span>:</h1>
                        <NewTaskForm />
                    
                        <KanbanBoardView 
                            tasks={tasks} 
                            activeTaskId={activeTask?.id ?? null}
                            isUpdating={isUpdatingTasks}
                            onTaskClick={handleTaskClick}
                        />

                        <DragOverlay dropAnimation={null}>
                            {activeTask ? (
                                <TaskCardView task={activeTask} />
                            ) : null}
                        </DragOverlay>

                    </DndContext>

                    <EditTaskModal
                        isOpen={isModalOpen}
                        task={editingTask}
                        onClose={() => {
                            setIsModalOpen(false);
                            setEditingTask(null);
                        }}
                        onSave={handleSaveTask}
                        onDelete={handleDeleteTask}
                    />

                </div>
            </section>

            {/* Footer */}
            <Footer />
        </main>
        </>
    );
}
