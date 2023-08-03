import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.datebase_url as string);

    logger.info(`Database is connected succesfully Working`);
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorLogger.error(`Failed to connnect database`, error);
  }

  process.on('unhandledRejection', error => {
    console.log(
      'Unhandle Rejection is detected, we are closing our server....'
    );
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
main();

//By sending signal the server will be stop process.exit(1) means hat automatically stops the NodeJS program when there is some problem with the code.
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
