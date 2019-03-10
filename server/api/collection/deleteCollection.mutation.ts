import { GenericMutationResponseType } from '../generic'
import { GraphQLNonNull, GraphQLInt } from 'graphql'
import { DeleteCollectionService } from '../../domains/Collection/DeleteCollectionService'

export interface DeleteCollectionFields {
    _id: number
}

export const deleteCollection = () => ({
    type: GenericMutationResponseType,
    args: {
        _id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: (_, args: DeleteCollectionFields) => DeleteCollectionService(args),
})
