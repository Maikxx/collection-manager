import { CollectionType } from './Collection.type'

export const listCollections = () => ({
    type: CollectionType,
    resolve: () => ({
        name: 'Naam',
    }),
})
