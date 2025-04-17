import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: process.env.DATABASE_TYPE,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
}));
