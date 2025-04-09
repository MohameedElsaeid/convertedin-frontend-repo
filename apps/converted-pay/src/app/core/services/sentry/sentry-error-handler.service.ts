import { ErrorHandler, Injectable } from '@angular/core';
import * as Sentry from '@sentry/angular';

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    const httpErrorResponse = error?.rejection ?? error;

    // Check if it's an HTTP error and the status code is between 400 - 500
    if (httpErrorResponse?.status >= 400 && httpErrorResponse?.status < 500) {
      // Ignore errors
      console.warn('Ignored error:', httpErrorResponse);
    } else {
      // Send other errors to Sentry
      Sentry.captureException(error);
    }
  }
}
