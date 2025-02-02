export async function executeOperation<T>(
    operationDescription: string,
    fn: () => Promise<T>
): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        console.error(operationDescription, error);
        throw error;
    }
}
