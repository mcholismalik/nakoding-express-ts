import './utils/environments'
import { Application } from './bin/application'
import debug from './utils/debugger'

const { debugApp } = debug
Application.createApplication().then(() => {
  debugApp('Server port: ', process.env.APP_PORT)
})
