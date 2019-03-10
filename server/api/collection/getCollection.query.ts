import { CollectionType } from './Collection.type'
import { GraphQLNonNull, GraphQLInt } from 'graphql'
import { GetCollectionService } from '../../domains/Collection/GetCollectionService'

export interface GetCollectionArgs {
    byId: number
}

export const getCollection = () => ({
    type: CollectionType,
    args: {
        byId: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: (_, args: GetCollectionArgs) => GetCollectionService(args),
})
