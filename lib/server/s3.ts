import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    },
    region: "us-east-1",
})

export async function uploadObject({ file, id, userId }: { id: string; userId: string; file: File }) {
    try {
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${userId}/${id}`,
            Body: await file.bytes(),
        })
        await client.send(command)
        return `https://${process.env.AWS_BUCKET_NAME}.s3.us-east-1.amazonaws.com/${userId}/${id}`

    } catch (error) {
        console.error(error)
        throw Error("Failed to upload file to S3")
    }
}

export async function deleteObject({ id }: { id: string }) {
    try {
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: id
        })
        await client.send(command)
    } catch (error) {
        console.error(error)
        throw Error("Failed to upload file to S3")
    }
}