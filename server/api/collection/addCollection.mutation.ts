import { CollectionType, AddCollectionType } from './Collection.type'
import { CollectionService } from '../../domains/Collection/CollectionService'

export interface AddCollectionFields {
    collection: {
        name: string
    }
}

export const addCollection = () => ({
    type: CollectionType,
    args: {
        collection: { type: AddCollectionType },
    },
    resolve: (_, args: AddCollectionFields) => {
        const collectionService = CollectionService()

        return collectionService.AddCollection(args)
    },
})
