import { CollectionType, EditCollectionType } from './Collection.type'
import { CollectionService } from '../../domains/Collection/CollectionService'
import { GraphQLNonNull } from 'graphql'

export interface EditCollectionArgs {
    collection: {
        _id: string
        name: string
    }
}

export const editCollection = () => ({
    type: CollectionType,
    args: {
        collection: { type: GraphQLNonNull(EditCollectionType) },
    },
    resolve: (_, args: EditCollectionArgs) => {
        const collectionService = CollectionService()

        return collectionService.EditCollection(args)
    },
})
