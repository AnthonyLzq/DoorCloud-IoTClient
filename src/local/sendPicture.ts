import debug from 'debug'

import { takePicture } from './takePicture'
import { getClient } from '../mqtt/server'

const pubDebug = debug('DoorCloud:Mqtt:demo:pub')
const client = getClient()

const sendPicture = async () => {
  client.on('error', (error: Error) => {
    pubDebug('Error: ', error)
  })

  client.publish('DoorCloud/photo', await takePicture(), () => {
    pubDebug('Message send')
  })
}

export { sendPicture }
