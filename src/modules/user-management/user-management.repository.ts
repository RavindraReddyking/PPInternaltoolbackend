import { Injectable } from '@nestjs/common';
import * as sql from 'mssql';
import { DatabaseService } from '../../database/database.service';
import { PortalUserLookup } from './user-management.types';

@Injectable()
export class UserManagementRepository {
  constructor(private readonly database: DatabaseService) {}

  async findUser(emailAddress?: string, userId?: string): Promise<PortalUserLookup | null> {
    const schema = this.database.schema;

    const normalizedEmail = (emailAddress ?? '').trim();
    const normalizedUserId = (userId ?? '').trim();

    // If frontend sends nothing → nothing to search
    if (!normalizedEmail && !normalizedUserId) {
      return null;
    }

    // TRUST frontend — use ONLY what UI sends
    const emailParam = normalizedEmail || null;
    const userIdParam = normalizedUserId || null;

    const result = await this.database.query(
      (request) =>
        request
          // email_address is VARCHAR(100) in DB
          .input('EmailAddress', sql.VarChar(100), emailParam)
          // user_id is CHAR(16) in DB
          .input('UserId', sql.Char(16), userIdParam),
      `
        EXEC ${schema}.usp_GetPlayerInfo
            @EmailAddress = @EmailAddress,
            @UserId       = @UserId;
      `,
    );

    return (result.recordset?.[0] as PortalUserLookup | undefined) ?? null;
  }

  async findByEmail(emailAddress: string): Promise<PortalUserLookup | null> {
    return this.findUser(emailAddress, undefined);
  }

  async findByUserId(userId: string): Promise<PortalUserLookup | null> {
    return this.findUser(undefined, userId);
  }

  async findByUserIdAndEmail(userId: string, emailAddress: string): Promise<PortalUserLookup | null> {
    return this.findUser(emailAddress, userId);
  }
}
