import { ApolloError } from 'apollo-server-express'
import { Collection, CollectedItem } from '../../models/Collection'
import { AddCollectedItemFields } from '../../api/collection/addCollectedItem.mutation'
import { CollectedItemInterface } from '../../types/Collection'
import { Types as MongooseTypes } from 'mongoose'

export const AddCollectedItemService = async (args: AddCollectedItemFields) => {
    const { _id, collectedItemName: newItemName } = args.collection

    try {
        const collection = await Collection
            .findOne({ _id: _id })
            .populate('collectedItems')

        if (!collection) {
            throw new ApolloError('No document with the given id exists', '404')
        }

        const collectedItems = collection.get('collectedItems') as CollectedItemInterface[]

        if (collectedItems && collectedItems.filter(item => item.name === newItemName).length > 0) {
            throw new ApolloError('A collected item with the given name already exists', '409')
        }

        const newCollectedItem = new CollectedItem({
            _id: new MongooseTypes.ObjectId(),
            createdAt: new Date(Date.now()),
            name: newItemName,
            assignedCollection: _id,
        })
        const newCollectedItemId = newCollectedItem.get('_id')

        const updatedCollection = await Collection
            .findByIdAndUpdate({ _id }, { $push: { collectedItems: newCollectedItemId }}, { new: true })
            .populate('collectedItems')

        return updatedCollection
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
