import { Contact } from '../models';
import { AppError } from '../utils/error/app-error';
import { WhereOptions } from 'sequelize';
import { Contact as ContactData } from '../dtos';

class ContactRepository {
    async create(data: ContactData) {
        try {
            return await Contact.create(data);
        } catch (error) {
            console.error("Error in create:", error);
            throw new AppError("Failed to create contact.", 500);
        }
    }

    async get(data: WhereOptions) {
        try {
            return await Contact.findOne({ where: data });
        } catch (error) {
            console.error("Error in get:", error);
            throw new AppError("Failed to retrieve contact.", 500);
        }
    }

    async getAll(conditions?: WhereOptions) {
        try {
            return await Contact.findAll({ where: conditions });
        } catch (error) {
            console.error("Error in getAll:", error);
            throw new AppError("Failed to retrieve all contacts.", 500);
        }
    }

    async destroy() {
        try {
            const response = await Contact.destroy({ where: {}, truncate: true });
            return response;
        } catch (error) {
            throw new AppError("Failed to delete the contacts.", 500);
        }
    }

    async update(updates: Partial<ContactData>, conditions: WhereOptions) {
        try {
            const [affectedRows] = await Contact.update(updates, { where: conditions });

            if (affectedRows === 0) {
                throw new AppError("No contacts found to update.", 404);
            }

            return affectedRows;
        } catch (error) {
            console.error("Error in update:", error);
            if (error instanceof AppError) {
                throw error;
            }
            
            throw new AppError("Failed to update contact.", 500);
        }
    }
}

export default new ContactRepository();