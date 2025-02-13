import express from 'express';
import { ContactController } from '../controllers/contact-controller';
import { ContactMiddleware } from '../middlewares'; 

const Router = express.Router();

Router.get('/contacts', ContactController.getContacts);
Router.post('/identify', ContactMiddleware.validateCreateRequest, ContactController.createContact);
Router.delete('/contacts', ContactController.deleteAllContacts);


export default Router;
