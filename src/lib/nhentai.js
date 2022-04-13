// @ts-check
import { API } from 'nhentai'
import axios from 'axios'

const api = new API()

export const getDoujinBuffer = async () => {
  const random = await api.randomDoujinID()
  const doujin = await api
    .fetchDoujin(random)
    .then(({ pages, id, titles }) => ({
      page: pages.at(0).url,
      type: pages.at(0).extension,
      titles,
      id,
    }))

  /**
   * @type {{data: Buffer}}
   */
  const { data } = await axios(doujin.page, {
    responseType: 'arraybuffer',
  })

  return {
    buffer: data,
    ...doujin,
  }
}

export const findDoujin = async (id) => {
  if (!(await api.doujinExists(id))) return { content: `doujin #${id} does not exist` }

  const doujin = await api.fetchDoujin(id).then(({ pages, titles }) => ({
    titles,
    page: pages.at(0).url,
    type: pages.at(0).extension,
  }))

  const { data } = await axios(doujin.page, {
    responseType: 'arraybuffer',
  })

  return {
    buffer: data,
    ...doujin,
  }
}
