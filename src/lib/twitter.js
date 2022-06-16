import { TwitterApi } from 'twitter-api-v2'
import { getDoujin } from '../lib/nhentai.js'
import 'dotenv/config'

const client = new TwitterApi({
  appKey: process.env.APP_KEY,
  appSecret: process.env.APP_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
})

const getTweet = async ({ buffer, extension, titles, id }) => {
  const media = await client.v1.uploadMedia(buffer, {
    mimeType: extension,
  })

  const { data } = await client.v2.tweet({
    text: `${titles.pretty ?? titles.english ?? titles.japanese} - [#${id}]`,
    media: {
      media_ids: [media],
    },
  })

  console.log({
    createdAt: new Date(),
    ...data,
  })
}

export const tweetDoujin = async () => {
  const doujin = await getDoujin()

  await getTweet({ ...doujin })
}

// await tweetDoujin()
