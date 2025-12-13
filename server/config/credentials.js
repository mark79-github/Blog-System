import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const credentials = () => ({
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    db: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    privateKey: process.env.JWT_PRIVATE_KEY,
});

export default credentials();
