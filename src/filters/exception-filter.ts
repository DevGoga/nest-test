import { ArgumentsHost, Catch, ExceptionFilter as IExceptionFilter, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(Error)
export class ExceptionFilter implements IExceptionFilter {
  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();

    // TODO: Времени на реализацию нормального Exception Filter уже не хватало, грубо разделил на ожидаемые HTTP ошибки и неожиданные (от базы например)

    if (error instanceof HttpException) {
      response.status(error.getStatus()).send({
        error: error.name,
        message: error?.message,
      });
    }

    response.status(500).send({
      error: error.name,
      message: 'Internal Server Error',
    });
  }
}
