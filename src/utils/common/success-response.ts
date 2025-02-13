interface SuccessResponseType {
    success: boolean;
    message: string;
    data: Record<string, any>;
    error: Record<string, any>;
}

export const SuccessResponse: SuccessResponseType = {
    success: true,
    message: "Successfully completed the request",
    data: {},
    error: {}
};