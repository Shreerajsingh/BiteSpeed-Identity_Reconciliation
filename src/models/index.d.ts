import { Model, Sequelize } from 'sequelize';

interface ContactInstance extends Model {
    id: number;
    phoneNumber?: string;
    email?: string;
    linkedId?: number;
    linkPrecedence: 'primary' | 'secondary';
    createdAt: Date;
    updatedAt: Date;
}

interface DB {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    Contact: any;
}

declare const db: DB;
export = db;