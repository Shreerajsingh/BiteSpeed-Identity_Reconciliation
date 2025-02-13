import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ErrorResponse } from '../utils/common/error-response';
import { AppError } from '../utils/error/app-error';

interface CreateContactRequest {
    email?: string;
    password?: string;
}

export function validateCreateRequest(
    req: Request<{}, {}, CreateContactRequest>,
    res: Response,
    next: NextFunction
): void {
    if (!req.body.email && !req.body.password) {
        ErrorResponse.message = "Something went wrong while creating contact";
        ErrorResponse.error = new AppError("Either Email or Phone must be provided", StatusCodes.BAD_REQUEST);

        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        return;
    }

    next();
}
