import { CollectionType, EditCollectionType } from './Collection.type'
import { GraphQLNonNull } from 'graphql'
import { EditCollectionService } from '../../domains/Collection/EditCollectionService'

export interface EditCollectionArgs {
    collection: {
        _id: number
        name: string
    }
}

export const editCollection = () => ({
    type: CollectionType,
    args: {
        collection: { type: GraphQLNonNull(EditCollectionType) },
    },
    resolve: (_, args: EditCollectionArgs) => {
        return EditCollectionService(args)
    },
})
