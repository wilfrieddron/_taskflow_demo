import { api } from "~/trpc/react";
import { useState } from "react";

export function NewTaskForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const utils = api.useUtils();
    
    const createTask = api.task.create.useMutation({
        onSuccess: () => {
            setTitle("");
            setDescription("");
            void utils.task.all.invalidate();
        },
    });

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        createTask.mutate({
            title,
            description: description || undefined,
            order: 0,
        });
    };

    return (
        <form className="flex flex-col gap-2 mb-6" onSubmit={handleSubmit}>
            <input 
                className="flex-1 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-sky-500"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task Title"
            />
            <textarea 
                className="rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-sm min-h-[60px] focus:border-sky-500"
                placeholder="Description (optional)"
                onChange={(e)=> setDescription(e.target.value)}
                value={description}
            />
            <button 
                className="rounded-lg px-4 py-2 text-sm font-medium bg-sky-600 hover:bg-sky-500 disabled:opacity-50"
                disabled={createTask.isPending}
                type="submit"
            >
                Add task
            </button>
        </form>
    );
}