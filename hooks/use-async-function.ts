import { useState } from "react";

export type LoadingState = "default" | "loading" | "error" | "success";

type R = { data?: object, error?: string }
type AsyncFn<T> = (args: T) => Promise<R>;

interface UseAsyncActionOptions<R> {
    state?: string;
    onResult?: (res: R) => void;
    onError?: (e: { error: string }) => void;
}

export function useAsyncAction<T>(
    asyncFn: AsyncFn<T>,
    options?: UseAsyncActionOptions<R>
) {
    const [state, setState] = useState<LoadingState>("default");

    const startLoading = () => {
        setState("loading");
    };

    const finishLoading = () => {
        setState("default");
    };

    async function handleAction(args: T): Promise<R> {
        startLoading();
        const { data, error } = await asyncFn(args);
        finishLoading();
        if (error) {
            options?.onError?.({ error })
        } else {
            options?.onResult?.({ data })
        }
        return { data, error };
    }
    return {
        state,
        handleAction,
    };
}
