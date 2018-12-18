import { ListCollectionType } from './Collection.type'
import { CollectionService } from '../../domains/Collection/CollectionService'

export const listCollections = () => ({
    type: ListCollectionType,
    resolve: async (root, args) => {
        const collectionService = CollectionService()

        const nodes = await collectionService.ListCollections()
        return {
            nodes: nodes,
        }
    },
})
