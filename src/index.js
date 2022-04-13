// @ts-check
import { setTimeout } from 'timers/promises'
import { tweetImage } from './lib/twitter.js'

const main = async () => {
  await setTimeout(300000, tweetImage)

  await main()
}

main()
