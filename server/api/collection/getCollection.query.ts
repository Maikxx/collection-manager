import { CollectionType } from './Collection.type'
import { CollectionService } from '../../domains/Collection/CollectionService'
import { GraphQLNonNull, GraphQLInt } from 'graphql'

export interface GetCollectionArgs {
    byId: number
}

export const getCollection = () => ({
    type: CollectionType,
    args: {
        byId: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (_, args) => {
        const collectionService = CollectionService()

        const collection = await collectionService.GetCollection(args)
        return collection
    },
})
