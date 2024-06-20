import '@tanstack/react-query';
import { AppError } from '@app/services/http-client';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AppError;
  }
}
