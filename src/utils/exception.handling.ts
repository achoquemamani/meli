import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export class ExceptionHandling {
  public handleException(LOGGER: Logger, error: any) {
    const message = error.message ? error.message : error;
    LOGGER.error(message);
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: message,
      },
      HttpStatus.BAD_REQUEST,
      {
        cause: error,
      },
    );
  }
}
