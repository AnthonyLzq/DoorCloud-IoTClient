import { capture } from '@anthonylzq/node-webcam'
import { resolve } from 'path'
import { getTimestamp } from 'utils'

const takePicture = async () => {
  const timestamp = getTimestamp()

  await capture({
    location: resolve(__dirname, '..', '..', 'media', `photo_${timestamp}.png`),
    options: {
      output: 'png'
    }
  })
}

export { takePicture }
