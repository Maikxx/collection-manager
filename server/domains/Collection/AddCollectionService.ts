import { AddCollectionFields } from '../../api/collection/addCollection.mutation'
import { ApolloError } from 'apollo-server-express'
import { Collection } from '../../models/Collection'
import { Types as MongooseTypes } from 'mongoose'

export const AddCollectionService = async (args: AddCollectionFields) => {
    const { name } = args.collection

    try {
        const existingDocumentWithName = await Collection
            .findOne({ name: { $regex: new RegExp(name, 'i') }})

        if (existingDocumentWithName !== null) {
            throw new ApolloError('Name already exists', '409')
        }

        const collection = new Collection({
            _id: new MongooseTypes.ObjectId(),
            createdAt: new Date(Date.now()),
            name,
        })

        const response = await collection.save()
        return response
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
