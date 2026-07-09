import { getAuth } from 'firebase-admin/auth';
import { UserRepository } from '../repositories/user.repository';
import { generateToken } from '../utils/jwt';
import { BadRequestError, UnauthorizedError } from '../utils/errors';
import { IUser } from '../types';

export class AuthService {
  private readonly userRepository = new UserRepository();

  async register(data: any): Promise<{ user: IUser; token: string }> {
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new BadRequestError('Email address already registered.');
    }

    const user = await this.userRepository.create(data);
    const token = generateToken({ id: user.id, role: user.role });

    return { user, token };
  }

  async login(data: any): Promise<{ user: IUser; token: string }> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new BadRequestError('Invalid email or password.');
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      throw new BadRequestError('Invalid email or password.');
    }

    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
  }

  async getMe(userId: string): Promise<IUser> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('User session invalid.');
    }
    return user;
  }

  async googleLogin(idToken: string): Promise<{ user: IUser; token: string }> {
    try {
      // 1. Verify Google ID token using Firebase Admin SDK
      const decodedToken = await getAuth().verifyIdToken(idToken);
      const { uid, email, name, picture } = decodedToken;

      if (!email) {
        throw new BadRequestError('Email address not returned by Google Sign-In.');
      }

      // 2. Query database for user matching googleId or email
      let user = await this.userRepository.findOne({ $or: [{ googleId: uid }, { email }] });

      if (user) {
        // Link google credentials if local account is found
        let updated = false;
        if (!user.googleId) {
          user.googleId = uid;
          updated = true;
        }
        if (!user.photoUrl && picture) {
          user.photoUrl = picture;
          user.profileImageUrl = picture;
          updated = true;
        }
        if (user.provider !== 'google') {
          user.provider = 'google';
          updated = true;
        }
        if (updated) {
          await user.save();
        }
      } else {
        // 3. User does not exist, auto-create patient account
        user = await this.userRepository.create({
          name: name || 'Google User',
          email,
          role: 'patient',
          provider: 'google',
          googleId: uid,
          photoUrl: picture || null,
          profileImageUrl: picture || null,
        });
      }

      // 4. Generate app token
      const token = generateToken({ id: user.id, role: user.role });
      return { user, token };
    } catch (error: any) {
      throw new UnauthorizedError(`Google Token verification failed: ${error.message}`);
    }
  }
}
export default AuthService;
