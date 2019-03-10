import { GetCollectionArgs } from '../../api/collection/getCollection.query'
import { ApolloError } from 'apollo-server-express'
import { database } from '../../db/db'

export async function GetCollectionService(args: GetCollectionArgs) {
    const { byId: _id } = args

    try {
        const { rowCount: collectionRowCount, rows: collections } = await database.query(
            'SELECT * FROM collections WHERE _id = $1;',
            [_id]
        )

        if (collectionRowCount === 0) {
            throw new ApolloError('Collection does not exist', '404')
        }

        const { rows: collectedItems } = await database.query(
            'SELECT * FROM "collectedItems" WHERE "collectionId" = $1;',
            [_id]
        )

        return {
            ...collections[0],
            collectedItems: collectedItems,
        }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
