// @ts-check
import { tweetImage, tweetStream } from './lib/twitter.js'

const main = async () => {
  await tweetImage()
  await tweetStream()
}

while (true) {
  setTimeout(main, 60000)
}
