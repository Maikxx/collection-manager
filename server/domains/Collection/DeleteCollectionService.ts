import { DeleteCollectionFields } from '../../api/collection/deleteCollection.mutation'
import { ApolloError } from 'apollo-server-express'
import { Collection } from '../../db/models/Collection'

export const DeleteCollectionService = async (args: DeleteCollectionFields) => {
    const { _id } = args
    try {
        const doc = await Collection.find({ _id })

        if (!doc || !doc.length) {
            throw new ApolloError('Document does not exist', '404')
        }

        await Collection.find({ _id }).remove()

        return { success: true }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
