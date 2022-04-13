// @ts-check
import { tweetImage, tweetStream } from './lib/twitter.js'

const main = async () => {
  await tweetImage()
  await tweetStream()
}

setTimeout(main, 600000)
