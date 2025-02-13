import express, { Application } from 'express';
import cors from 'cors';
import serverConfig from './config/serverConfig';
import ContactRouter from './routes/contact-routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', ContactRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server is up on port: ${serverConfig.PORT}`);
});