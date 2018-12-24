import { ApolloError } from 'apollo-server-express'
import { Collection } from '../../models/Collection'

export const ListCollectionsService = async () => {
    try {
        const docs = await Collection.find({})

        return docs
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
