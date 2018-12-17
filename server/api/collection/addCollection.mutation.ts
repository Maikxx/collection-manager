import { CollectionType, AddCollectionType, AddCollectionFields } from './Collection.type'
import { CollectionService } from '../../domains/Collection/CollectionService'

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
