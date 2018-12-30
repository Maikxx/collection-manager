import { ApolloError } from 'apollo-server-express'
import { AddCollectedItemFields } from '../../api/collectedItem/addCollectedItem.mutation'
import { database } from '../../db/db'

export const AddCollectedItemService = async (args: AddCollectedItemFields) => {
    const { _id, collectedItemName } = args.collection

    try {
        const { rowCount: existingRowCount } = await database.query(
            'SELECT * FROM "collectedItems" WHERE LOWER(name) = LOWER($1) AND "collectionId" = $2;',
            [ collectedItemName, _id ]
        )

        if (existingRowCount > 0) {
            throw new ApolloError('Name for this item already already exists within the collection', '409')
        }

        const { rows } = await database.query(
            'INSERT INTO "collectedItems" (name, "collectionId") VALUES ($1, $2) RETURNING *;',
            [ collectedItemName, _id ]
        )

        return rows[0]
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
