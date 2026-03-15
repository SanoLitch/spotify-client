import { User } from '../domain/user.entity';

export const USER_REPOSITORY_PORT = Symbol.for('USER_REPOSITORY_PORT');

export interface UserRepositoryPort {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
}
