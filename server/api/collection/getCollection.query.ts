import { CollectionType } from './Collection.type'
import { CollectionService } from '../../domains/Collection/CollectionService'
import { MongoID } from '../../scalars/MongoID'

export interface GetCollectionArgs {
    byId: string
}

export const getCollection = () => ({
    type: CollectionType,
    args: {
        byId: { type: MongoID },
    },
    resolve: async (_, args) => {
        const collectionService = CollectionService()

        const collection = await collectionService.GetCollection(args)
        return collection
    },
})
