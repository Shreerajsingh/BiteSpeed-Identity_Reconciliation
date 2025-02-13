import dotenv from 'dotenv';

dotenv.config();

interface ServerConfig {
    PORT: string | number;
}

const config: ServerConfig = {
    PORT: process.env.PORT || 3000
};

export default config;