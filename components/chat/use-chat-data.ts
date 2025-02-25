import { useQueries } from '@tanstack/react-query';
import type { GetMessagesResponse, GetUserPreferencesResponse } from '@/lib/client/types';

export function useChatData(id: string) {
    const [messagesQuery, preferencesQuery] = useQueries({
        queries: [
            {
                queryKey: ["messages", id],
                queryFn: () =>
                    fetch(`/api/chat/${id}/messages`).then((res) => res.json()) as Promise<GetMessagesResponse>,
            },
            {
                queryKey: ["preferences"],
                queryFn: () =>
                    fetch("/api/user/preferences").then((res) => res.json()) as Promise<GetUserPreferencesResponse>,
            },
        ]
    });
    const isLoading =
        messagesQuery.isLoading || preferencesQuery.isLoading;
    const isError =
        messagesQuery.isError || preferencesQuery.isError;

    return {
        messages: messagesQuery.data?.data ?? [], 
        preferences: preferencesQuery.data?.data,
        isLoading,
        isError,
    };
} 