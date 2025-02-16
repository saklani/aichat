import { generateEmbeddings } from "@/lib/ai/embeddings";
import { withAuth } from "@/lib/server/api/middleware";
import { GetObjectResponseSchema } from "@/lib/server/api/schema";
import { queries } from "@/lib/server/db";
import { objects } from "@/lib/server/store/objects";
import { NextRequest } from "next/server";
import { randomUUID } from "node:crypto";

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

// Types
type ApiError = {
    error: string;
    status: number;
};

// Validation functions
function validateFile(file: File | null): ApiError | null {
    if (!file) {
        return { error: "No file provided", status: 400 };
    }
    if (file.size > MAX_FILE_SIZE) {
        return { error: "File size exceeds 10MB limit", status: 400 };
    }
    return null;
}

async function embedFile(id: string, file: File): Promise<ApiError | null> {
    const text = await file.text()
    const embeddings = await generateEmbeddings(text)

    for (const embedding of embeddings) {
        await queries.createEmbedding({
            id,
            ...embedding,
        });
    }

    return null;
}


async function validateStorageLimit(userId: string, fileSize: number): Promise<ApiError | null> {
    const userPlan = await queries.getUserPlan({ userId });
    if (!userPlan) {
        return { error: "No user plan found", status: 500 };
    }
    if (userPlan.storageUsage + fileSize > userPlan.storageLimit) {
        return { error: "Storage limit exceeded", status: 400 };
    }
    return null;
}

// Helper functions
async function createOrUpdateChat(chatId: string, userId: string, fileId: string): Promise<ApiError | { chat: any }> {
    let chat = await queries.getChat({ id: chatId, userId });

    if (!chat) {
        const title = "New chat";
        const collection = await queries.createCollection({
            name: title,
            userId,
            fileIds: [fileId],
        });

        if (!collection) {
            return { error: "Failed to create collection", status: 500 };
        }

        chat = await queries.createChat({
            id: chatId,
            title,
            userId,
            collectionId: collection.id,
        });
    } else {
        if (!chat.collectionId) {
            return { error: "No collection found", status: 400 };
        }

        const collection = await queries.getCollection({ id: chat.collectionId, userId });
        if (!collection) {
            return { error: "No collection found", status: 400 };
        }

        await queries.updateCollection({
            id: chat.collectionId,
            userId,
            fileIds: [...(collection.fileIds ?? []), fileId],
        });
    }

    return { chat };
}


export async function POST(request: NextRequest) {
    return withAuth(async (userId) => {
        const formData = await request.formData();
        const chatId = formData.get('chat-id') as string;
        const file = formData.get('file') as File;

        // Validate inputs
        if (!chatId) {
            return { error: "Chat ID is required", status: 400 };
        }

        const fileError = validateFile(file);
        if (fileError) return fileError;

        const storageError = await validateStorageLimit(userId, file.size);
        if (storageError) return storageError;

        // Create and upload file
        const fileId = randomUUID().toString();

        await queries.createObject({
            id: fileId,
            name: file.name,
            type: file.type,
            size: file.size,
            metadata: "",
            userId,
        });

        const url = await objects.upload({
            file,
            id: fileId,
            userId,
        });

        const updatedObject = await queries.updateObject({
            id: fileId,
            userId,
            url,
            status: "processing",
        });

        // Handle chat and collection
        const chatResult = await createOrUpdateChat(chatId, userId, fileId);
        if ('error' in chatResult) return chatResult;

        // Generate and store embeddings
        const embedError = await embedFile(fileId, file);
        if (embedError) return embedError;

        // Update object status to complete after processing
        const finalObject = await queries.updateObject({
            id: fileId,
            userId,
            status: "ready",
        });
        // Validate response
        const validateObject = GetObjectResponseSchema.safeParse(finalObject);
        if (!validateObject.success) {
            console.error("[Data Validation Error]", validateObject.error);
            return {
                error: "Invalid response data format",
                status: 500
            };
        }

        return {
            data: validateObject.data,
            status: 200
        };
    });
}

