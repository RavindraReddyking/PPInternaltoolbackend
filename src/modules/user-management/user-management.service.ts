import { Injectable } from '@nestjs/common';
import { UserManagementRepository } from './user-management.repository';

@Injectable()
export class UserManagementService {
  constructor(private readonly repository: UserManagementRepository) {}

  async findByEmail(emailAddress: string) {
    const row = await this.repository.findByEmail(emailAddress);

    return {
      success: true,
      api: 'user-management/search',
      count: row ? 1 : 0,
      data: row ? [row] : [],
    };
  }

  async findByUserId(userId: string) {
    const row = await this.repository.findByUserId(userId);

    return {
      success: true,
      api: 'user-management/search',
      count: row ? 1 : 0,
      data: row ? [row] : [],
    };
  }

  async findUser(emailAddress?: string, userId?: string) {
    const row = await this.repository.findUser(emailAddress, userId);

    return {
      success: true,
      api: 'user-management/search',
      count: row ? 1 : 0,
      data: row ? [row] : [],
    };
  }
}
