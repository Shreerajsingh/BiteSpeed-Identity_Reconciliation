import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ContactService } from '../services';
import { ErrorResponse, SuccessResponse } from '../utils/common';
import {  
    ContactResponse
} from '../dtos';

async function createContact(req: Request, res: Response): Promise<any> {
    try {
        const { email, phoneNumber } = req.body;

        const response: ContactResponse = await ContactService.createContact({
            email: email || null,
            phone: phoneNumber || null
        });

        return res.status(StatusCodes.CREATED).json({ contact: response });
    } catch (error: any) {
        console.error("Error in createContact:", error);

        ErrorResponse.message = error.explanation || "Internal Server Error";
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getContacts(req: Request, res: Response): Promise<any> {
    try {
        const response = await ContactService.getContacts(req.body.id);

        SuccessResponse.message = "Requested contacts";
        SuccessResponse.data = { contacts: response };
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
        ErrorResponse.message = "Error in fetching the contacts";
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function deleteAllContacts(req: Request, res: Response): Promise<any> {
    try {
        const response = await ContactService.destroyAllContacts();

        SuccessResponse.message = "Contacts deleted successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error: any) {
        ErrorResponse.message = "Error in deleting the contacts";
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

export const ContactController = {
    createContact,
    getContacts,
    deleteAllContacts
};