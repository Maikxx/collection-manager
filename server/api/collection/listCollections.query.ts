import { ListCollectionType } from './Collection.type'
import { ListCollectionsService } from '../../domains/Collection/ListCollectionsService'

export const listCollections = () => ({
    type: ListCollectionType,
    resolve: async () => {
        const nodes = await ListCollectionsService()
        return { nodes }
    },
})
