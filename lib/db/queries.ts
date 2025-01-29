import { randomUUID } from 'crypto';
import { and, asc, eq } from 'drizzle-orm';
import { db } from "./db";
import { agent, message, model, object } from "./schema";
import { schema } from '.';
import { Message } from 'ai/react';

export async function saveDocument({
    id,
    name,
    userId,
}: {
    id: string;
    name: string;
    userId: string;
}) {
    try {
        return await db.insert(object).values({
            id,
            name,
            userId,
        });
    } catch (error) {
        console.error('Failed to save document in database');
        throw error;
    }
}



export async function saveMessage({message, agentId}: { message: Omit<Message, "id">, agentId: string }) {
    try {
        return await db.insert(schema.message).values({...message, agentId});
    } catch (error) {
        console.error('Failed to save messages in database', error);
        throw error;
    }
}

export async function getMessagesByAgentId({ id }: { id: string }) {
    try {
        return await db
            .select()
            .from(message)
            .where(eq(message.agentId, id))
            .orderBy(asc(message.createdAt));
    } catch (error) {
        console.error('Failed to get messages by agent id from database', error);
        throw error;
    }
}


export async function createAgent({ name, modelId, userId }: { name: string; modelId: number; userId: string }) {
    const id = randomUUID().toString();
    try {
        await db.insert(agent).values({
            id,
            name,
            modelId,
            userId,
        });
        return id;
    } catch (error) {
        console.error('Failed to create agent in database', error);
        return null;
    }
}

export async function updateAgent({ id, name, modelId, userId }: { id: string; name: string; modelId: number; userId: string }) {
    try {
        return await db.update(agent).set({
            name,
            modelId,
        }).where(and(eq(agent.id, id), eq(agent.userId, userId)));
    } catch (error) {
        console.error('Failed to create agent in database', error);
        throw error;
    }
}

export async function deleteAgent({ id, name, modelId, userId }: { id: string; name: string; modelId: number; userId: string }) {
    try {
        return await db.update(agent).set({
            name,
            modelId,
        }).where(and(eq(agent.id, id), eq(agent.userId, userId)));
    } catch (error) {
        console.error('Failed to create agent in database', error);
        throw error;
    }
}


export async function getAgentsByUserId({ userId }: { userId: string }) {
    try {
        return await db.select().from(agent).where(eq(agent.userId, userId)).innerJoin(model, eq(agent.modelId, model.id));
    } catch (error) {
        console.error('Failed to get agents from database', error);
        throw error;
    }
}

export async function getModels() {
    try {
        return await db.query.model.findMany();
    } catch (error) {
        console.error('Failed to get models from database', error);
        throw error;
    }
}