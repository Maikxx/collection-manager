import { ApolloError } from 'apollo-server-express'
import { Collection } from '../../models/Collection'
import { AddCollectedItemFields } from '../../api/collection/addCollectedItem.mutation'

export const AddCollectedItemService = async (args: AddCollectedItemFields) => {
    const { _id } = args.collection

    try {
        const collection = await Collection
            .findOne({ _id: _id })
            .populate('collectedItems')

        if (!collection) {
            throw new ApolloError('No document with the given id exists', '404')
        }

        await Collection.findByIdAndUpdate({
            _id,
        }, {
            $set: {},
        })
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
