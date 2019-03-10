import { CollectionType, AddCollectionType } from './Collection.type'
import { GraphQLNonNull } from 'graphql'
import { AddCollectionService } from '../../domains/Collection/AddCollectionService'

export interface AddCollectionFields {
    collection: {
        name: string
        description: string | null
    }
}

export const addCollection = () => ({
    type: CollectionType,
    args: {
        collection: { type: GraphQLNonNull(AddCollectionType) },
    },
    resolve: (_, args: AddCollectionFields) => AddCollectionService(args),
})
