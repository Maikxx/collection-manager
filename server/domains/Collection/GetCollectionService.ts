import { GetCollectionArgs } from '../../api/collection/getCollection.query'
import { ApolloError } from 'apollo-server-express'
import { Collection } from '../../models/Collection'

export const GetCollectionService = async (args: GetCollectionArgs) => {
    const { byId } = args

    try {
        const doc = await Collection.find({ _id: byId })

        if (!doc || !doc.length) {
            throw new ApolloError('Collection does not exist', '404')
        }

        return doc[0]
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
