import { ApolloError } from 'apollo-server-express'
import { Collection } from '../../db/models/Collection'

export const ListCollectionsService = async () => {
    try {
        const docs = await Collection
            .find({})
            .populate('collectedItems')

        return docs
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
