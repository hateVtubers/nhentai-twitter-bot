import { TwitterApi, ETwitterStreamEvent } from 'twitter-api-v2'
import { getDoujinBuffer, findDoujin } from '../lib/nhentai.js'
import 'dotenv/config'

const client = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
})
const {
  data: { id },
} = await client.currentUserV2()

export const tweetImage = async () => {
  const { buffer, type, titles, id } = await getDoujinBuffer()

  const media_ids = await client.v1.uploadMedia(buffer, {
    mimeType: type,
  })

  const tweet = await client.v1.tweet(
    `${titles.pretty ?? titles.english} - [#${id}]\n`,
    {
      media_ids,
    }
  )

  return {
    tweet,
  }
}

export const tweetStream = async () => {
  const stream = await client.v1.filterStream({
    track: '@Nhentaibot',
  })

  stream.autoReconnect = true
  stream.keepAliveTimeoutMs = Infinity

  stream.on(ETwitterStreamEvent.Data, async ({ id_str, user, text }) => {
    const regex = text.match(/\d+/gm).join('')
    const tweet = await findDoujin(regex)

    if (tweet?.content) {
      client.v2.tweet(`@${user.screen_name} ${tweet?.content}`, {
        reply: {
          in_reply_to_tweet_id: id_str,
        },
      })
    } else {
      const media_ids = await client.v1.uploadMedia(tweet.buffer, {
        mimeType: tweet.type,
      })

      client.v1.tweet(`@${user.screen_name} ${tweet.titles.pretty}\n`, {
        in_reply_to_status_id: id_str,
        exclude_reply_user_ids: id,
        media_ids,
      })
    }
  })

  setTimeout(stream.close(), 500000)
}
