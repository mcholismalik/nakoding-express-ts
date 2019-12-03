import debug from './debugger'
import dotEnv from 'dotenv'

dotEnv.config()
const { debugApp, debugError } = debug
const envs: any = {
  local: 'development.local',
  staging: 'staging',
  production: 'production'
}

const defaultEnv = envs.local
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development.local'
  debugError(
    `No Env has been found. By default, ${defaultEnv} has been set as NODE_ENV.`
  )
}
debugApp(`Environment: ${process.env.NODE_ENV}`)
