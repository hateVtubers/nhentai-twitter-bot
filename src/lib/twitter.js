import { TwitterApi } from 'twitter-api-v2'
import { getDoujin, getDoujinRecursive } from '../lib/nhentai.js'
import 'dotenv/config'

const client = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
})

const getTweet = async ({ buffer, extension, titles, id }) => {
  const media_ids = await client.v1.uploadMedia(buffer, {
    mimeType: extension,
  })

  const { created_at } = await client.v1.tweet(
    `${titles.pretty ?? titles.english ?? titles.japanese} - [#${id}]\n`,
    {
      media_ids,
    }
  )

  console.log({
    created_at,
    titles,
    id,
  })
}

export const tweetDoujin = async () => {
  try {
    const { buffer, extension, id, titles } = await getDoujin()

    await getTweet({ buffer, extension, id, titles })
  } catch (error) {
    const { buffer, extension, id, titles } = await getDoujinRecursive()

    await getTweet({ buffer, extension, id, titles })
  }
}
