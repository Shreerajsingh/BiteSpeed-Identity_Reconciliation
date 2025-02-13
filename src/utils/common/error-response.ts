interface ErrorResponseType {
    success: boolean;
    message: string;
    data: Record<string, any>;
    error: Record<string, any>;
}

export const ErrorResponse: ErrorResponseType = {
    success: false,
    message: "Something went wrong!",
    data: {},
    error: {}
};