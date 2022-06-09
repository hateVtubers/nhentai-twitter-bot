// @ts-check
import { tweetDoujin } from './lib/twitter.js'

const main = () => {
  setInterval(tweetDoujin, 60000)
}

main()
