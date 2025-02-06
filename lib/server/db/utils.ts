export async function execute<T>(
    description: string,
    fn: () => Promise<T>
): Promise<{ response?: T, error?: string }> {
    try {
        return { response: await fn() };
    } catch (error) {
        console.error(description, error);
        throw Error(`DATABASE ERROR: ${description}`);
    }
}
