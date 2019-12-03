import '../utils/environments'
import { authMiddleware } from '../middleware/authMiddleware'
import { Express, NextFunction, Response, Request } from 'express'
import RateLimit from 'express-rate-limit'
import dbHelper from '../database/models'
import listeners from '../listeners'
import cookieParser from 'cookie-parser'
import indexRouter from './../routes'
import bodyParser from 'body-parser'
import { Server } from 'http'
import express from 'express'
import hpp from 'hpp'


export class ExpressServer {
  private server?: Express
  private httpServer?: Server

  /**
   * Setup express server
   * @param {number} port app port number to running the service
   */
  public async setup(port: number) {
    const server = express()
    await this.setupStandardMiddlewares(server)
    await this.setupSecurityMiddlewares(server)
    await this.setupCustomMiddlewares(server)
    await this.configureApiEndpoints(server)
    await this.dbConnection()
    await this.runListeners()

    this.httpServer = this.listen(server, port)
    this.server = server
    return this.server
  }

  /**
   * Listening the express server
   * @param {*} server server setup
   * @param {number} port server port number
   */
  public listen(server: Express, port: number) {
    return server.listen(port)
  }

  /**
   * Handle app kill proccess
   */
  public kill() {
    if (this.httpServer) this.httpServer.close()
  }

  /**
   * Initialize Database Connection
   *
   */
  public dbConnection() {
    // Check Database Connection Status
    dbHelper.establishConnections()
  }
  /**
   * Setup and applied security middleware
   * @param {*} server server setup
   */
  private setupSecurityMiddlewares(server: Express) {
    server.use(hpp())
  }

  /**
   * Setup and applied standard middleware
   * @param {*} server server setup
   */
  private setupStandardMiddlewares(server: Express) {
    server.use(bodyParser.json())
    server.use(cookieParser())
  }

  /**
   * Setup and applied custom middleware
   * @param {*} server server setup
   */
  private setupCustomMiddlewares(server: Express) {
    server.use(authMiddleware)
  }

  /**
   * Application error and trace reporting
   * all error will be send to Google stack driver
   * @param {*} server server
   * */
  private errorHandler(server: Express) {
    server.use(function (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      if (err && err.error && err.error.isJoi) {
        res.status(400).json({
          success: false,
          flag: 'BAD_REQUEST',
          message: err.error.toString()
        })
      } else {
        res.status(err.status || 500)
        res.status(500).json({
          status: false,
          code: 'APP_CRASH',
          message: err.message,
          error: err
        })
      }
    })
  }

  /**
   * Basic Routing configuration
   * @param {*} server server setup
   */
  private configureApiEndpoints(server: Express) {
    // Rate limit conf
    const timeValue: number = 15 * 60 * 1000 // 15 min in ms
    const maxRequest: number = 200

    // Response if limit reached
    var rateLimitMessage: any = {
      status: false,
      flag: 'LIMIT_REACHED',
      message:
        'This endpoint has a stricter rate limiting of a maximum of 200 requests per 15 minutes window, please lower your request rate'
    }

    // Set Rate Limit
    const strictRateLimit = new RateLimit({
      windowMs: timeValue,
      max: maxRequest,
      message: rateLimitMessage
    })

    // Health check
    server.get('/check', function (req: Request, res: Response) {
      res.json({ success: true, status: 'UP!' })
    })

    server.use('/', strictRateLimit, indexRouter)
    this.errorHandler(server)
  }

  /**
   * Run listeners
   */
  private runListeners() {
    listeners()
  }
}
