import { EditCollectionArgs } from '../../api/collection/editCollection.mutation'
import { ApolloError } from 'apollo-server-express'
import { Collection } from '../../models/Collection'

export const EditCollectionService = async (args: EditCollectionArgs) => {
    const { collection } = args
    const { _id, name } = collection

    try {
        const doc = await Collection.findByIdAndUpdate(_id, { $set: { name }})
        console.log(doc)
        return doc[0]
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
