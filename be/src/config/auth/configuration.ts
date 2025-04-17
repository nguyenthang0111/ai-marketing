import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
    secret: process.env.JWT_SECRET,
    clientId: process.env.ClientID_GOOGLE,
    clientSecret: process.env.ClientSecret_GOOGLE,
}));
