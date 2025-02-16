export type SUPPORTED_FILE_TYPES = 'txt' | 'csv';

export class DocumentParser {
    private static readonly CHUNK_SIZE = 1000;
    private static readonly CHUNK_OVERLAP = 200;

    private static async getLoader(file: File, fileType: SUPPORTED_FILE_TYPES) {

    }
}