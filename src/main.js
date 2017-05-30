import { consume } from '@mobyourlife/amqp-wrapper'

import actions from './actions'

consume('cache', (message) => {
  const source = actions[message.source]
  if (source) {
    const storeCache = source[message.type]
    if (storeCache) {
      storeCache(message.payload)
        .then(res => message.answer('callback', res))
        .catch(err => {
          message.answer('callback', err)
          message.error('Failed to store cache!', err)
        })
    } else {
      message.error('No valid handler for this message type!')
    }
  } else {
    message.error('No valid handler for this message source!')
  }
})
