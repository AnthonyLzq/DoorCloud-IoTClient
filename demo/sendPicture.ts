import { sendPicture } from '../src'
import { mqttConnection } from '../src/mqtt/server'

const main = async () => {
  const connection = mqttConnection()
  const client = await connection.start()
  const cb = () => {
    connection.stop()
  }

  sendPicture(client, cb)
}

main()
