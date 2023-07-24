import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'
async function main() {
  let server: Server
  try {
    await mongoose.connect(config.datebase_url as string)

    logger.info(`Database is connected succesfully Working`)
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error(`Failed to connnect database`, error)
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandle Rejection is detected, we are closing our server....')

    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
main()
