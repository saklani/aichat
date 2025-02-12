export async function execute<T>(
    description: string,
    fn: () => Promise<T>
): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        console.error(description, error);
        throw Error(`DATABASE ERROR: ${description}`);
    }
}
