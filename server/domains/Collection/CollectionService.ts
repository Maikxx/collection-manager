import { AddCollectionFields } from '../../api/collection/Collection.type'
import { Collection } from '../../models/Collection'
import { ApolloError } from 'apollo-server-express'
import { Types as MongooseTypes } from 'mongoose'

export const CollectionService = () => {
    const AddCollection = async (args: AddCollectionFields) => {
        const { name } = args.fields

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

        const databaseData = await collection.save()
        return databaseData
    }

    const ListCollections = async (args: any) => {
        const docs = await Collection.find({})

        return docs
    }

    return {
        AddCollection,
        ListCollections,
    }
}
