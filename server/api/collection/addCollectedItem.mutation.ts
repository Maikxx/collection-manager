import { CollectionType, AddCollectedItemType } from './Collection.type'
import { CollectionService } from '../../domains/Collection/CollectionService'
import { GraphQLNonNull } from 'graphql'

export interface AddCollectedItemFields {
    collection: {
        _id: string
        collectedItemName: string
    }
}

export const addCollectedItem = () => ({
    type: CollectionType,
    args: {
        collection: { type: GraphQLNonNull(AddCollectedItemType) },
    },
    resolve: (_, args: AddCollectedItemFields) => {
        const collectionService = CollectionService()

        return collectionService.AddCollectedItem(args)
    },
})
