import { ExpressServer } from './expressServer'
import config from 'config'

const debug = require('debug')('server:error')

export class Application {
  /**
   * Define and create the server
   */
  public static async createApplication() {
    const appPort: any = process.env.APP_PORT
    const expressServer = new ExpressServer()
    await expressServer.setup(appPort)
    Application.handleExit(expressServer)
    return expressServer
  }

  /**
   * Handling the error
   */
  private static handleExit(express: ExpressServer) {
    process.on('uncaughtException', async (err: Error) => {
      debug('Uncaught exception', err)
      Application.shutdownProperly(1, express)
    })
    process.on('unhandledRejection', (reason: any | null | undefined) => {
      debug('Unhandled Rejection at promise', reason.stack)
      Application.shutdownProperly(2, express)
    })
    process.on('SIGINT', () => {
      debug('Application closed by user')
      Application.shutdownProperly(128 + 2, express)
    })
    process.on('SIGTERM', () => {
      debug('Application closed by user')
      Application.shutdownProperly(128 + 2, express)
    })
    process.on('exit', () => {
      debug('Exiting')
    })
  }

  /**
   * Handling app shutdown
   * @param {string} exitCode server sign exit code
   * @param {*} server server setup
   */
  private static shutdownProperly(exitCode: number, express: ExpressServer) {
    Promise.resolve()
      .then(() => express.kill())
      .then(() => {
        debug('Shutdown complete')
        process.exit(exitCode)
      })
      .catch(err => {
        debug('Error during shutdown', err)
        process.exit(1)
      })
  }
}
