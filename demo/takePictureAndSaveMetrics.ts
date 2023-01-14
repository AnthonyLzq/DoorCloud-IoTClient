import { writeFileSync } from 'fs'
import { resolve } from 'path'

import { takePictureAndReturnMetrics } from '../src'

const main = async () => {
  const regexNumber = /^\d+$/
  const iterations = regexNumber.test(process.argv[2])
    ? parseInt(process.argv[2])
    : 1000
  const results: (string | number)[][] = [['timeAt', 'seconds']]
  let average = 0

  console.log(`Taking photos ${iterations}...`)

  for (let i = 0; i < iterations; i++) {
    const seconds = await takePictureAndReturnMetrics('jpg')

    average += seconds
    results.push([new Date().toISOString(), seconds])
    console.log(`Photo: ${i + 1}`)
  }

  average = parseFloat((average / iterations).toFixed(3))
  writeFileSync(
    resolve(__dirname, 'metrics', 'takingPhoto.csv'),
    results.join('\n'),
    'utf-8'
  )
  console.log(`Done! Average time: ${average} seconds`)
  process.exit(0)
}

main()
