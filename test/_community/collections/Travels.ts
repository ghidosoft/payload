import type { CollectionConfig } from 'payload'

const Travels: CollectionConfig = {
  slug: 'travels',
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titolo',
    },
    {
      name: 'slug',
      type: 'text',
      label: 'URL',
      required: true,
      unique: true,
      index: true,
    },
  ],
}

export default Travels
