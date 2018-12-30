import { GenericMutationResponseType } from '../generic'
import { GraphQLInt, GraphQLNonNull } from 'graphql'
import { DeleteCollectedItemService } from '../../domains/CollectedItem/DeleteCollectedItemService'

export interface DeleteCollectedItemFields {
    _id: number
}

export const deleteCollectedItem = () => ({
    type: GenericMutationResponseType,
    args: {
        _id: { type: GraphQLNonNull(GraphQLInt) },
    },
    resolve: (_, args: DeleteCollectedItemFields) => {
        return DeleteCollectedItemService(args)
    },
})
