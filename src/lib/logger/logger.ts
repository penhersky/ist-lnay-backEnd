import path from 'path';
import bunyan from 'bunyan';
import { Mask } from './mask';
import { NODE_LOGGING_LEVEL } from '../../config';

const log = bunyan.createLogger({
  name: 'log',
  streams: [
    {
      level: NODE_LOGGING_LEVEL,
      stream: process.stdout,
    },
    {
      level: NODE_LOGGING_LEVEL,
      path: path.resolve(__dirname, '..', '..', '..', 'logError.json'),
    },
  ],
});

export default new Mask(log);
