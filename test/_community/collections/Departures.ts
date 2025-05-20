import type { CollectionConfig } from 'payload'

const Departures: CollectionConfig = {
  slug: 'departures',
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      index: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'travel',
      type: 'relationship',
      relationTo: 'travels',
      label: 'Programma di viaggio',
      required: true,
      index: true,
    },
    {
      name: 'date',
      type: 'date',
      label: 'Data partenza',
      required: true,
      index: true,
      admin: {
        date: {
          displayFormat: 'dd/MM/yyyy',
        },
      },
    },
  ],
}

export default Departures
