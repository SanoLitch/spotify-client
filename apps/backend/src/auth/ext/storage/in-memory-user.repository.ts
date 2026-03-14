import { Injectable } from '@nestjs/common';
import { UserRepositoryPort } from './user-repository.port';
import { User } from '../../domain/user.entity';

@Injectable()
export class InMemoryUserRepository implements UserRepositoryPort {
  private readonly users: Map<string, User> = new Map();

  public async save(user: User): Promise<void> {
    this.users.set(user.id.getValue(), user);
  }

  public async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  public async findByEmail(email: string): Promise<User | null> {
    return Array.from(this.users.values()).find(user => user.email === email) || null;
  }
}
