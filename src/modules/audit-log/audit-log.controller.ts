import { Controller, Get } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuditLogService } from './audit-log.service';

@Controller('audit-logs')
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  @Roles('ADMIN')
  list() {
    return this.auditLogService.list(200);
  }

  // ⭐ NEW: Return ALL logs (90 days)
  @Get('all')
  @Roles('ADMIN')
  getAll() {
    return this.auditLogService.getAllLogs();
  }
}
