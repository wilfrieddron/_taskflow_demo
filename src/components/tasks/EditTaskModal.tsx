"use client";

import { useEffect, useState } from "react";
import { COLUMN_LABELS } from "~/features/tasks/constants";
import type { TaskLike, TaskStatus } from "~/features/tasks/types";

interface EditTaskModalProps {
    isOpen: boolean;
    task: TaskLike | null;
    onClose: () => void;
    onSave: (data: { 
        id: string;
        title: string; 
        description?: string; 
        status: TaskStatus; 
        order: number;
    }) => void;
    onDelete: (taskId: string) => void;
}

export function EditTaskModal({ isOpen, task, onClose, onSave, onDelete }: EditTaskModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<TaskStatus>("TODO");

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description ?? "");
            setStatus(task.status);
        }
    }, [task]);

    if (!isOpen || !task) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: task.id,
            title,
            description: description || undefined,
            status,
            order: task.order,
        });
    };

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/70 backdrop-blur">
            <div className="w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
                <header className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-50">
                        Edit <span className="text-sky-400">_Task_</span>
                    </h2>
                    <button
                        className="text-slate-400 hover:text-slate-200 text-sm"
                        onClick={onClose}
                        type="button"
                    >
                        X
                    </button>
                </header>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-400" htmlFor="title">
                            Title
                        </label>
                        <input 
                            id="title"
                            className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Task Title"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-400" htmlFor="description">
                            Description
                        </label>
                        <textarea 
                            id="description"
                            className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm min-h-[60px] focus:border-sky-500"
                            placeholder="Description (optional)"
                            onChange={(e)=> setDescription(e.target.value)}
                            value={description}
                            rows={3}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs text-slate-400" htmlFor="description">
                            Status
                        </label>
                        <select 
                            id="status"
                            className="rounded-lg bg-slate-800 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-sky-500"
                            onChange={(e)=> setStatus(e.target.value as TaskStatus)}
                            value={status}
                        >
                            <option value="TODO">{COLUMN_LABELS.TODO}</option>
                            <option value="IN_PROGRESS">{COLUMN_LABELS.IN_PROGRESS}</option>
                            <option value="DONE">{COLUMN_LABELS.DONE}</option>
                        </select>
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-3">
                        <button
                            className="rounded-lg border-1 border-red-800 px-3 py-2 text-xs font-medium text-slate-50 hover:bg-red-500/10"
                            type="button"
                            onClick={() => onDelete(task.id)}
                        >
                            Delete
                        </button>
                        <div className="flex gap-2">
                            <button
                                className="rounded-lg bg-slate-600 px-3 py-2 text-xs font-medium text-slate-50 hover:bg-slate-600/90"
                                type="button"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-slate-100 hover:bg-sky-600/90"
                                type="submit"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
        
    )
}