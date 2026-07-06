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
}
export default AuthService;
