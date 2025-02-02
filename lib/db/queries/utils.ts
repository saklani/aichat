

export async function executeDbOperation<T>(
    operationDescription: string,
    fn: () => Promise<T>
): Promise<{ response?: T, error?: string }> {
    try {
        return { response: await fn() };
    } catch (error) {
        console.error(operationDescription, error);
        return { error: operationDescription };
    }
}
