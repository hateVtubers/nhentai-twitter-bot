import { API } from 'nhentai'

const api = new API()

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getDoujinRecursive = async () => {
  const id = getRandomNumber(1, 1000000)

  if (await api.doujinExists(id)) {
    const { pages, titles, id } = await api.randomDoujin()
    const buffer = await pages.at(0)?.fetch()
    const extension = pages.at(0)?.extension

    return {
      buffer,
      extension,
      titles,
      id,
    }
  } else {
    const doujin = await getDoujinRecursive()

    return { ...doujin }
  }
}

export const getDoujin = async () => {
  try {
    const { pages, titles, id } = await api.randomDoujin()
    const buffer = await pages.at(0)?.fetch()
    const extension = pages.at(0)?.extension

    return {
      buffer,
      extension,
      titles,
      id,
    }
  } catch (error) {
    return await getDoujinRecursive()
  }
}

/* console.log(await getDoujinRecursive()) */
/* console.log(await getDoujin()) */
