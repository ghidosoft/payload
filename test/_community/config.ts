import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { fileURLToPath } from 'node:url'
import path from 'path'

import { buildConfigWithDefaults } from '../buildConfigWithDefaults.js'
import { devUser } from '../credentials.js'
import Departures from './collections/Departures.js'
import { MediaCollection } from './collections/Media/index.js'
import { PostsCollection, postsSlug } from './collections/Posts/index.js'
import Travels from './collections/Travels.js'
import { MenuGlobal } from './globals/Menu/index.js'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfigWithDefaults({
  // ...extend config here
  collections: [PostsCollection, MediaCollection, Departures, Travels],
  admin: {
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor({}),
  globals: [
    // ...add more globals here
    MenuGlobal,
  ],
  onInit: async (payload) => {
    await payload.create({
      collection: 'users',
      data: {
        email: devUser.email,
        password: devUser.password,
      },
    })

    await payload.create({
      collection: postsSlug,
      data: {
        title: 'example post',
      },
    })

    for (let i = 0; i < 100; i++) {
      const travel = await payload.create({
        collection: 'travels',
        data: {
          _status: 'published',
          slug: `travel-${i}`,
          title: `example travel ${i}`,
        },
        // disableTransaction: true, // Why (???)
      })

      const date = new Date(Date.now() + 3600000 * (i + 1))

      await payload.create({
        collection: 'departures',
        data: {
          _status: 'published',
          date: date.toISOString(),
          slug: `departure-${i}`,
          travel: travel.id,
        },
        // disableTransaction: true, // Why (???)
      })
    }
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
