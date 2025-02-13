import express, { Application } from 'express';
import cors from 'cors';
import serverConfig from './config/serverConfig';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(serverConfig.PORT, () => {
    console.log(`Server is up on port: ${serverConfig.PORT}`);
});