import { CollectionType, AddCollectionType } from './Collection.type'

export const addCollection = () => ({
    type: CollectionType,
    args: {
        fields: { type: AddCollectionType },
    },
    resolve: (root, args) => ({
        id: '1',
        name: args.fields.name,
    }),
})
