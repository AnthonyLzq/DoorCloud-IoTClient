const getTimestamp = () => new Date().getTime()

const randomWait = async (min = 1000, max = 2000) => {
  await new Promise(resolve => {
    setTimeout(resolve, Math.floor(Math.random() * (max - min) + min))
  })
}

export { getTimestamp, randomWait }
