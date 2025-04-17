import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  QueryFailedError,
  EntityNotFoundError,
  CannotCreateEntityIdMapError,
} from 'typeorm';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    console.log('🚀 ~ AllExceptionsFilter ~ exception:', exception);
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const responseBody = exception.getResponse() as any;
      message =
        'message' in responseBody && Array.isArray(responseBody?.message)
          ? responseBody.message[0]
          : exception.message;
    } else if (exception instanceof EntityNotFoundError) {
      httpStatus = HttpStatus.NOT_FOUND;
      message = `${(exception as any).entityClass.name.replace(/Entity$/, '')} does not exist`;
    } else if (exception instanceof QueryFailedError) {
      httpStatus = HttpStatus.BAD_REQUEST;
      if ((exception as any).code === 'ER_DUP_ENTRY') {
        const entityName = (exception as any).driverError.sqlMessage.match(
          /for key '(.+?)'/,
        )[1];
        message = `${entityName.replace(/.IDX_.+$/, '')} name already exists`;
      } else {
        message = exception.message;
      }
    } else if (exception instanceof CannotCreateEntityIdMapError) {
      httpStatus = HttpStatus.BAD_REQUEST;
      message = exception.message;
    }

    const responseBody = {
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      method: request.method,
      timestamp: new Date().toISOString(),
      statusCode: httpStatus,
      code: (exception as any).name,
      message,
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
