import { capture } from '@anthonylzq/node-webcam'
import { resolve } from 'path'
import { getTimestamp } from 'utils'

const takePicture = async () => {
  const timestamp = getTimestamp()

  return await capture({
    location: resolve(
      __dirname,
      '..',
      '..',
      'media',
      `photo_test_${timestamp}.png`
    ),
    options: {
      output: 'png'
    },
    returnType: 'buffer'
  })
}

export { takePicture }
