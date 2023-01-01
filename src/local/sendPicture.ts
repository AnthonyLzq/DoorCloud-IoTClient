import debug from 'debug'

import { takePicture } from './takePicture'
import { getClient } from '../mqtt/server'

const pubDebug = debug('DoorCloud:Mqtt:demo:pub')
const client = getClient()

const sendPicture = async () => {
  const format = 'jpg'

  client.on('error', (error: Error) => {
    pubDebug('Error: ', error)
  })

  client.publish(
    'DoorCloud/photo',
    `be52983b-d563-4ea4-8793-6baad72d679f----${format}----${await takePicture(
      format
    )}`,
    () => {
      pubDebug('Message send')
      process.exit(0)
    }
  )
}

export { sendPicture }
