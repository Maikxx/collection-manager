import { CollectionService } from '../../domains/Collection/CollectionService'
import { GenericMutationResponseType } from '../generic'
import { MongoID } from '../../scalars/MongoID'

export interface DeleteCollectionFields {
    _id: string
}

export const deleteCollection = () => ({
    type: GenericMutationResponseType,
    args: {
        _id: { type: MongoID },
    },
    resolve: (_, args: DeleteCollectionFields) => {
        const collectionService = CollectionService()

        return collectionService.DeleteCollection(args)
    },
})
