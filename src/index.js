// @ts-check
import { tweetDoujin } from './lib/twitter.js'

const main = () => {
  setInterval(tweetDoujin, 900000)
}

main()
