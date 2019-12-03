import debug from 'debug'

debug.enable('server:*')

interface Namespaces {
  debugApp: Function
  debugError: Function
  debugDB: Function
  debugRedis: Function
  debugController: Function
  debugPubSub: Function
}

const namespaces: Namespaces = {
  debugApp: debug('server:app'),
  debugError: debug('server:error'),
  debugDB: debug('server:db'),
  debugRedis: debug('server:redis'),
  debugController: debug('server:controller'),
  debugPubSub: debug('server:pubsub')
}

const values = Object.values(namespaces)
values.forEach((e, i) => {
  e.color = i
})

export default namespaces
