export interface UserInterface {
  userId: string;
  email: string;
  password: string | null;
  name: string;
  avatarUrl: string | null;
  googleId: string | null;
  emailProvider: string;
  accountStatus: string;
  verificationToken: string | null;
  updatedAt: Date;
}