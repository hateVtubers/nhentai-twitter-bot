// @ts-check
import { setTimeout } from 'timers/promises'
import { tweetImage } from './lib/twitter.js'

const main = async () => {
  await setTimeout(1800000, tweetImage())
  console.log('tweet')

  await main()
}

main()
