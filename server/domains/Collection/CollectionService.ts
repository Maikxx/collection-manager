import { Collection } from '../../models/Collection'
import { ApolloError } from 'apollo-server-express'
import { Types as MongooseTypes } from 'mongoose'
import { AddCollectionFields } from '../../api/collection/addCollection.mutation'
import { GetCollectionArgs } from '../../api/collection/getCollection.query'
import { DeleteCollectionFields } from '../../api/collection/deleteCollection.mutation'
import { EditCollectionArgs } from '../../api/collection/editCollection.mutation'

export const CollectionService = () => {
    const AddCollection = async (args: AddCollectionFields) => {
        const { name } = args.collection

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

    const ListCollections = async () => {
        const docs = await Collection.find({})

        return docs
    }

    const DeleteCollection = async (args: DeleteCollectionFields) => {
        const { _id } = args
        const doc = await Collection.find({ _id })

        if (!doc || !doc.length) {
            throw new ApolloError('Document does not exist', '404')
        }

        await Collection.find({ _id }).remove()

        return {
            success: true,
        }
    }

    const GetCollection = async (args: GetCollectionArgs) => {
        const { byId } = args

        const doc = await Collection.find({ _id: byId })

        if (!doc || !doc.length) {
            throw new ApolloError('Document does not exist', '404')
        }

        return doc[0]
    }

    const EditCollection = async (args: EditCollectionArgs) => {
        const { collection } = args
    }

    return {
        AddCollection,
        DeleteCollection,
        GetCollection,
        EditCollection,
        ListCollections,
    }
}
