import { z } from 'zod';
import { LinkPrecedence as Enums } from '../utils/common';

export const ContactRequestSchema = z.object({
    email: z.string().email().optional(),
    phoneNumber: z.string().optional()
});

export const ContactCreateSchema = z.object({
    email: z.string().email().nullable(),
    phone: z.string().nullable()
});

export const ContactResponseSchema = z.object({
    primaryContactId: z.number(),
    emails: z.array(z.string()),
    phoneNumbers: z.array(z.string()),
    secondaryContactIds: z.array(z.number())
});

export const ContactSchema = z.object({
    id: z.number(),
    phoneNumber: z.string().optional(),
    email: z.string().email().optional(),
    linkedId: z.number().optional(),
    linkPrecedence: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().optional()
});

export const ContactDataSchema = z.object({
    phoneNumber: z.string().nullable().optional(),
    email: z.string().nullable().optional(),
    linkedId: z.number().nullable().optional(),
    linkPrecedence: z.enum([Enums.PRIMARY, Enums.SECONDARY])
});

export type ContactRequest = z.infer<typeof ContactRequestSchema>;
export type ContactCreate = z.infer<typeof ContactCreateSchema>;
export type ContactResponse = z.infer<typeof ContactResponseSchema>;
export type ContactSchema = z.infer<typeof ContactSchema>;
export type Contact = z.infer<typeof ContactDataSchema>;