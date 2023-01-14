import debug from 'debug'

import { takePicture } from './takePicture'
import { getClient } from '../mqtt/server'

const pubDebug = debug('DoorCloud:Mqtt:demo:pub')
const client = getClient()

const sendPicture = async () => {
  const format = 'jpeg'

  client.on('error', (error: Error) => {
    pubDebug('Error: ', error)
  })

  client.publish(
    'DoorCloud/photo',
    `7----${format}----${await takePicture(format)}`,
    () => {
      pubDebug('Message send')
      process.exit(0)
    }
  )
}

export { sendPicture }
