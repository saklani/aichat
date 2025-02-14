import { withAuth } from "@/lib/server/api/middleware";
import { FileUploadResponseSchema } from "@/lib/server/api/schema";
import { objects } from "@/lib/server/store/objects";
import { nanoid } from "nanoid";


/**
 * POST /api/store/objects
 * Uploads a file to storage
 */
export async function POST(request: Request) {
    return withAuth(async (userId) => {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return {
                error: "No file provided",
                status: 400
            };
        }

        // Validate file size (10MB limit)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return {
                error: "File size exceeds 10MB limit",
                status: 400
            };
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            return {
                error: "Invalid file type",
                status: 400
            };
        }

        const fileId = nanoid();
        const url = await objects.upload({
            file,
            id: fileId,
            userId,
        });

        // Validate response data
        const validatedResponse = FileUploadResponseSchema.safeParse({
            url,
            fileId,
        });

        if (!validatedResponse.success) {
            console.error("[Data Validation Error]", validatedResponse.error);
            return {
                error: "Invalid response data format",
                status: 500
            };
        }

        return {
            data: validatedResponse.data,
            status: 201
        };
    });
}
