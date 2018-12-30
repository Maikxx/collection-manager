import { GenericMutationResponseType } from '../generic'
import { GraphQLInt, GraphQLNonNull } from 'graphql'
import { CollectionService } from '../../domains/Collection/CollectionService'

export interface DeleteCollectedItemFields {
    _id: number
}

export const deleteCollectedItem = () => ({
    type: GenericMutationResponseType,
    args: {
        _id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: (_, args: DeleteCollectedItemFields) => {
        const collectionService = CollectionService()

        return collectionService.DeleteCollectedItem(args)
    },
})
