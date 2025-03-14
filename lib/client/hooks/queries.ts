import { useQuery } from "@tanstack/react-query";
import { GetUserResponse, GetUserPreferenceResponse  } from "@/lib/schema";

export function useUser() {
    const { data, isLoading, error } = useQuery<GetUserResponse>({
        queryKey: ["user"],
        queryFn: () => fetch("/api/user").then((res) => res.json()),
    });
    return { data, isLoading, error };
}

export function useUserPreferences() {
    const { data, isLoading, error } = useQuery<GetUserPreferenceResponse>({
        queryKey: ["userPreferences"],
        queryFn: () => fetch("/api/userPreferences").then((res) => res.json()),
    });
    return { data, isLoading, error };
}

