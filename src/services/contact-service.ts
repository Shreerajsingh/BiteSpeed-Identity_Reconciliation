// src/services/contact.service.ts
import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import { ContactRepository } from '../repositories';
import { LinkPrecedence as Enums } from '../utils/common';
import { AppError } from '../utils/error/app-error';
import CompareDates from '../utils/helper/dateTime-helper';
import { 
    ContactSchema as Contact, 
    ContactCreate, 
    ContactResponse
} from '../dtos';

export class ContactService {
    static async getContacts(id?: number): Promise<Contact[]> {
        try {
            if (id) {
                return await ContactRepository.get({ id });
            }
            return await ContactRepository.getAll();
        } catch (error) {
            throw error;
        }
    }

    static async destroyAllContacts(): Promise<number> {
        try {
            return await ContactRepository.destroy();
        } catch (error) {
            throw error;
        }
    }

    static async createContact(data: ContactCreate): Promise<ContactResponse> {
        try {
            const { email, phone } = data;
            let c1ID: number | null = null;
            let c2ID: number | null = null;

            if (email) {
                const emailContact = await ContactRepository.get({ email });
                if (emailContact) c1ID = emailContact.linkedId || emailContact.id;
            }

            if (phone) {
                const phoneContact = await ContactRepository.get({ phoneNumber: phone });
                if (phoneContact) c2ID = phoneContact.linkedId || phoneContact.id;
            }

            const rootId = await this.rootFounder(email, phone, c1ID, c2ID);
            return await this.responseGenerator(rootId);
        } catch (error: any) {
            throw new AppError(
                `Error creating contact: ${error.message}`, 
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    private static async responseGenerator(rootId: number): Promise<ContactResponse> {
        try {
            const contacts = await ContactRepository.getAll({
                [Op.or]: [{ id: rootId }, { linkedId: rootId }]
            });

            const response: ContactResponse = {
                primaryContactId: rootId,
                emails: [],
                phoneNumbers: [],
                secondaryContactIds: []
            };

            contacts.forEach((contact: Contact) => {
                if (contact.email && !response.emails.includes(contact.email)) {
                    response.emails.push(contact.email);
                }
                if (contact.phoneNumber && !response.phoneNumbers.includes(contact.phoneNumber)) {
                    response.phoneNumbers.push(contact.phoneNumber);
                }
                if (contact.linkPrecedence === Enums.SECONDARY) {
                    response.secondaryContactIds.push(contact.id);
                }
            });

            return response;
        } catch (error: any) {
            throw new AppError(
                `Error generating response: ${error.message}`, 
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }

    private static async rootFounder(
        email: string | null, 
        phone: string | null, 
        c1ID: number | null, 
        c2ID: number | null
    ): Promise<number> {
        try {
            const contact1 = c1ID ? await ContactRepository.get({ id: c1ID }) : null;
            const contact2 = c2ID ? await ContactRepository.get({ id: c2ID }) : null;

            if (!contact1 && !contact2) {
                const newContact = await ContactRepository.create({
                    email,
                    phoneNumber: phone,
                    linkedId: null,
                    linkPrecedence: Enums.PRIMARY
                });
                return newContact.id;
            }

            if (contact1 && !contact2) {
                if (phone) {
                    await ContactRepository.create({
                        email,
                        phoneNumber: phone,
                        linkedId: contact1.id,
                        linkPrecedence: Enums.SECONDARY
                    });
                }
                return contact1.id;
            }

            if (contact2 && !contact1) {
                if (email) {
                    await ContactRepository.create({
                        email,
                        phoneNumber: phone,
                        linkedId: contact2.id,
                        linkPrecedence: Enums.SECONDARY
                    });
                }
                return contact2.id;
            }

            if (contact1 && contact2) {
                const checkDate = CompareDates(contact1.createdAt, contact2.createdAt);
                const [primary, secondary] = checkDate ? [contact1, contact2] : [contact2, contact1];

                if(primary.id == secondary.id) return primary.id;
                await ContactRepository.update(
                    { 
                        linkedId: primary.id, 
                        linkPrecedence: Enums.SECONDARY 
                    },
                    { 
                        [Op.or]: [
                            { id: secondary.id }, 
                            { linkedId: secondary.id }
                        ] 
                    }
                );

                return primary.id;
            }

            throw new AppError(
                'Invalid contact state', 
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        } catch (error: any) {
            throw new AppError(
                `Error finding root contact: ${error.message}`, 
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}