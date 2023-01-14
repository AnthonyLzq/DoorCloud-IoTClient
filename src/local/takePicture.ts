import { unlinkSync } from 'fs'
import { resolve } from 'path'
import { capture, NodeWebcamConfig } from '@anthonylzq/node-webcam'

import { getTimestamp } from 'utils'

const takePicture = async (
  format: NodeWebcamConfig['output'],
  cb?: (value?: string | Buffer | undefined) => void
): Promise<string | Buffer> => {
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

const takePictureAndReturnMetrics = async (
  format: NodeWebcamConfig['output'],
  cb?: (value?: string | Buffer | undefined) => void
): Promise<number> => {
  const timestampBefore = getTimestamp()
  const location = resolve(
    __dirname,
    '..',
    '..',
    'media',
    `photo_test_${timestampBefore}.${format}`
  )

  await capture({
    location,
    options: {
      output: format
    },
    returnType: 'base64',
    cb
  })

  const timestampAfter = getTimestamp()

  unlinkSync(location)

  return parseFloat(((timestampAfter - timestampBefore) / 1000).toFixed(3))
}

export { takePicture, takePictureAndReturnMetrics }
