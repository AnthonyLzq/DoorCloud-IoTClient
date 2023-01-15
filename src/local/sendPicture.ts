import debug from 'debug'
import { MqttClient } from 'mqtt'

import { takePicture, takePictureAndDeleteIt } from './takePicture'
import { getTimestamp } from 'utils'

const sendPicture = async (client: MqttClient, cb: () => void) => {
  const format = 'jpeg'
  const pubDebug = debug('DoorCloud:Demo:sendPicture')

  client.publish(
    'DoorCloud/photo',
    `7----${format}----${await takePicture(format)}`,
    () => {
      pubDebug('Message send')
      cb()
    }
  )
}

const sendPictureAndReturnMetrics = async (
  client: MqttClient,
  cb: (error: Error | null, seconds: number) => void
) => {
  const format = 'jpeg'
  const pubDebug = debug('DoorCloud:Demo:sendPictureAndReturnMetrics')
  const timestampBefore = getTimestamp()

  client.publish(
    'DoorCloud/photo',
    `7----${format}----${await takePictureAndDeleteIt(format)}`,
    () => {
      const timestampAfter = getTimestamp()

      pubDebug('Message send')
      cb(
        null,
        parseFloat(((timestampAfter - timestampBefore) / 1000).toFixed(3))
      )
    }
  )
}

export { sendPicture, sendPictureAndReturnMetrics }
