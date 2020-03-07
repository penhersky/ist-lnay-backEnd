import logger from './logger';
import { Error } from '../../constants';

export const logError = (message: string, path: string, object: string) => {
  logger.error(message, { path, object });
};

export const serverError = (
  message: string,
  path: string,
  object: string,
): { error: string } => {
  logger.error(message, { path, object });
  return { error: Error.SERVER_ERROR };
};
