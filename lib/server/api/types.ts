
export interface SuccessResponse<T> {
    data: T;
    status: number;
}

export interface ErrorResponse<T> {
    error: string;
    status: number;
}

export type Result<T> = SuccessResponse<T> | ErrorResponse<T>