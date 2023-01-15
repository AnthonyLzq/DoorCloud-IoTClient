import { writeFileSync } from 'fs'
import { resolve } from 'path'
import debug from 'debug'

import { sendPictureAndReturnMetrics } from '../src'
import { randomWait } from '../src/utils'
import { mqttConnection } from '../src/mqtt/server'

const namespace = 'DoorCloud:Demo:SendPictureAndSaveMetrics'
const log = debug(namespace)

const main = async () => {
  const regexNumber = /^\d+$/
  const iterations = regexNumber.test(process.argv[2])
    ? parseInt(process.argv[2])
    : 1000
  const results: (string | number)[][] = [['timeAt', 'seconds']]
  let average = 0
  const connection = mqttConnection()
  const client = await connection.start()
  const cb = (error: Error | null, seconds: number) => {
    if (error) log('error', error)

    results.push([new Date().toISOString(), seconds])
    average += seconds
  }

  log(`Taking photos ${iterations}...`)

  for (let i = 0; i < iterations; i++) {
    await sendPictureAndReturnMetrics(client, cb)
    log(`Photo: ${i + 1}`)
  }

  await randomWait(3_000, 5_000)
  connection.stop()
  writeFileSync(
    resolve(__dirname, 'metrics', 'sendingPhoto.csv'),
    results.join('\n'),
    'utf-8'
  )

  average = parseFloat((average / iterations).toFixed(3))

  log(`Done! Average time: ${average} seconds`)
  process.exit(0)
}

main()
