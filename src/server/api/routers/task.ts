import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

const statusEnum = z.enum(["TODO","IN_PROGRESS", "DONE"]);

export const taskRouter = createTRPCRouter({

    all: protectedProcedure
    .query(async({ctx}) => {
        return ctx.db.task.findMany({
            where: { userId: ctx.session.user.id },
            orderBy: { order: "asc" },
        });
    }),

    byStatus: protectedProcedure
    .input(
        z.object({
            status: statusEnum,
        }),
    )
    .query(async ({ctx, input}) => {
        return ctx.db.task.findMany({
            where:{ 
                status: input.status,
                userId: ctx.session.user.id,
            },
            orderBy: { order: "asc" },
        });
    }),

    //Create a new task in the database referenced in the context
    create: protectedProcedure
    .input( 
        z.object({
            title: z.string().min(1, "Title is mandatory"),
            description: z.string().optional(),
            order: z.number(),
        }),
    )
    .mutation(async ({ctx, input}) => {
        return ctx.db.task.create({
            data : {
                title: input.title,
                description: input.description ?? null,
                status: "TODO",
                userId: ctx.session.user.id,
                order: input.order,
            },
        });
    }),

    updateOrder: protectedProcedure
    .input(
        z.object({
            id: z.string(),
            order: z.number(),
        })
    )
    .mutation(async ({ctx, input}) => {
        return ctx.db.task.update({
            where: { 
                id: input.id 
            },
            data: { 
                order: input.order 
            },
        });
    }),

    updateStatus: protectedProcedure
    .input(
        z.object({
            id: z.string(),
            status: statusEnum,
        }),
    )
    .mutation(async ({ctx, input}) => {
        const task = await ctx.db.task.findFirst({
            where: {
                userId: ctx.session.user.id,
                id: input.id,
            },
        });

        if (!task) {
            throw new TRPCError({code:"NOT_FOUND"});
        }

        return ctx.db.task.update({
            where: { 
                id: input.id, 
            },
            data: { 
                status: input.status, 
            },
        });
    }),

    update: protectedProcedure
    .input(
        z.object({
            id: z.string(),
            title: z.string().min(1, "Title is mandatory"),
            description: z.string().optional(),
            status: statusEnum,
            order: z.number(),
        }),
    )
    .mutation(async ({ctx, input}) => {
        const {id, title, description, status, order} = input;

        return ctx.db.task.update({
            where: { 
                id 
            },
            data: { 
                title: title, 
                description: description ?? null, 
                status: status,
                order: order, 
            }
        })
    }),

    delete: protectedProcedure
    .input(
        z.object({
            id: z.string(),
        }),
    )
    .mutation(async({ctx, input}) => {
        const task = await ctx.db.task.findFirst({
            where : {
                userId: ctx.session.user.id,
                id: input.id,
            }
        })

        if (!task) {
            throw new TRPCError({code:"NOT_FOUND"});
        }
        
        await ctx.db.task.delete({
            where: {id: input.id},
        });
        return { success: true};
    }),
});