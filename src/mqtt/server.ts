import mqtt from 'mqtt'
import debug from 'debug'

declare global {
  // eslint-disable-next-line no-var
  var __mqttClient__: mqtt.MqttClient
}

const options: mqtt.IClientOptions = {
  port: process.env.MQTT_PORT ? parseInt(process.env.MQTT_PORT) : 0,
  host: process.env.MQTT_HOST,
  protocol: 'mqtts',
  keepalive: 0,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASS
}
const namespace = 'DoorCloud:Mqtt:Server'
const debugMessage = 'Connected to mqtt server'

const getClient = () => {
  if (!global.__mqttClient__) {
    global.__mqttClient__ = mqtt.connect(options)
    global.__mqttClient__.on('connect', () => {
      const clientDebug = debug(namespace)

      clientDebug(debugMessage)
    })
  }

  return global.__mqttClient__
}

const mqttConnection = () => ({
  start: async () => {
    return getClient()
  },
  stop: async () => {
    getClient().end()
  }
})

export { getClient, mqttConnection, namespace, debugMessage }
