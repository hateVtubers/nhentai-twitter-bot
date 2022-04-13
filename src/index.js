// @ts-check
import { tweetImage, tweetStream } from './lib/twitter.js'

const main = async () => {
  await tweetImage()
  await tweetStream()

  await main()
}

main()
