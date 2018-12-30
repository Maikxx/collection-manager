import { CollectionType } from '../collection/Collection.type'
import { GraphQLNonNull } from 'graphql'
import { AddCollectedItemType } from './CollectedItem.type'
import { AddCollectedItemService } from '../../domains/CollectedItem/AddCollectedItemService'

export interface AddCollectedItemFields {
    collection: {
        _id: number
        collectedItemName: string
    }
}

export const addCollectedItem = () => ({
    type: CollectionType,
    args: {
        collection: { type: GraphQLNonNull(AddCollectedItemType) },
    },
    resolve: (_, args: AddCollectedItemFields) => {
        return AddCollectedItemService(args)
    },
})
