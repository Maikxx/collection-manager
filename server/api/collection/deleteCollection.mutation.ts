import { CollectionService } from '../../domains/Collection/CollectionService'
import { GenericMutationResponseType } from '../generic'
import { GraphQLNonNull, GraphQLInt } from 'graphql'

export interface DeleteCollectionFields {
    _id: number
}

export const deleteCollection = () => ({
    type: GenericMutationResponseType,
    args: {
        _id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: (_, args: DeleteCollectionFields) => {
        const collectionService = CollectionService()

        return collectionService.DeleteCollection(args)
    },
})
