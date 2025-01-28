import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { embeddings } from "./models/openai";

const pinecone = new PineconeClient();

export const vectorStore = new PineconeStore(embeddings, {
    pineconeIndex: pinecone.Index("test"),
    maxConcurrency: 5,
});

 

export async function search({content}: {content: string}) {
    const docs = await vectorStore.similaritySearch(content);
    return docs
}