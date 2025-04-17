import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, timeout, catchError } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const timeoutValue =
      this.reflector.get<number>('request-timeout', context.getHandler()) ||
      30000;

    return next.handle().pipe(
      timeout(timeoutValue),
      catchError((err) => {
        if (err.name === 'TimeoutError') {
          throw new RequestTimeoutException(
            'Internal server timeout. Please try again later.',
          );
        }
        throw err;
      }),
    );
  }
}
