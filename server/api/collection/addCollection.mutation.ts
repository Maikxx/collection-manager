import { CollectionType, AddCollectionType } from './Collection.type'
import { CollectionService } from '../../domains/Collection/CollectionService'

export interface AddCollectionFields {
    fields: {
        name: string
    }
}

export const addCollection = () => ({
    type: CollectionType,
    args: {
        fields: { type: AddCollectionType },
    },
    resolve: (root, args: AddCollectionFields) => {
        const collectionService = CollectionService()

        return collectionService.AddCollection(args)
    },
})
