import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from 'passport-google-oauth20'

export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.ClientID_GOOGLE,
            clientSecret: process.env.ClientSecret_GOOGLE,
            callbackURL: 'http://localhost:8081/api/auth/google/redirect',
            scope: ['profile', 'email'],
        })
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
    ): Promise<any> {
        const { id,name, emails, photos } = profile;
        const user = {
            googleId: id,
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken,
        };
        done(null, user);
    }
}