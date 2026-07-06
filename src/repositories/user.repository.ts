import { BaseRepository } from './base.repository';
import { User } from '../models/user.model';
import { IUser } from '../types';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email }).exec();
  }
}
export default UserRepository;
