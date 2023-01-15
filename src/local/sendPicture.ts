import debug from 'debug'
import { MqttClient } from 'mqtt'

import { takePicture, takePictureAndDeleteIt } from './takePicture'
import { diffTimeInSeconds, getTimestamp } from 'utils'

const sendPicture = async (client: MqttClient, cb: () => void) => {
  const format = 'jpeg'
  const pubDebug = debug('DoorCloud:Demo:sendPicture')

  client.publish(
    'DoorCloud/photo/send',
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
    'DoorCloud/photo/metrics',
    `${timestampBefore}----${await takePictureAndDeleteIt(format)}`,
    () => {
      const timestampAfter = getTimestamp()

      pubDebug('Message send')
      cb(null, diffTimeInSeconds(timestampBefore, timestampAfter))
    }
  )
}

export { sendPicture, sendPictureAndReturnMetrics }
