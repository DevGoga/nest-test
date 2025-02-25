import { Controller, Get, Header, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Health check')
@Controller('health-check')
export class HealthCheckController {
  @Header('Content-Type', 'text/plain')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Successful response',
    content: { 'text/plain': { example: 'pong' } },
  })
  @Get('')
  public ping() {
    return 'pong';
  }
}
