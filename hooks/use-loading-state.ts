import { useState } from "react";

export type LoadingState = "default" | "loading" | "error" | "success";

interface UseLoadingState {
  state: LoadingState;
  error: string | null;
  startLoading: () => void;
  finishLoading: () => void;
  failLoading: (err: string) => void;
}

export function useLoadingState(initialState: LoadingState = "default"): UseLoadingState {
  const [state, setState] = useState<LoadingState>(initialState);
  const [error, setError] = useState<string | null>(null);

  const startLoading = () => {
    setState("loading");
    setError(null);
  };

  const finishLoading = () => {
    setState("success");
  };

  const failLoading = (err: string) => {
    setState("error");
    setError(err);
  };

  return {
    state,
    error,
    startLoading,
    finishLoading,
    failLoading,
  };
}
