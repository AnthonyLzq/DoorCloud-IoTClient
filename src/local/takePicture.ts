import { capture, NodeWebcamConfig } from '@anthonylzq/node-webcam'
import { resolve } from 'path'
import { getTimestamp } from 'utils'

const takePicture = async (
  format: NodeWebcamConfig['output'],
  cb?: (value?: string | Buffer | undefined) => void
) => {
  const timestamp = getTimestamp()

  return await capture({
    location: resolve(
      __dirname,
      '..',
      '..',
      'media',
      `photo_test_${timestamp}.${format}`
    ),
    options: {
      output: format
    },
    returnType: 'base64',
    cb
  })
}

export { takePicture }
