import { DeleteCollectedItemFields } from '../../api/collectedItem/deleteCollectedItem.mutation'
import { database } from '../../db/db'
import { ApolloError } from 'apollo-server-core'

export const DeleteCollectedItemService = async (args: DeleteCollectedItemFields) => {
    const { _id } = args
    try {
        const { rowCount } = await database.query(
            'DELETE FROM "collectedItems" WHERE _id = $1;',
            [_id]
        )

        if (rowCount > 0) {
            return { success: true }
        }

        return { success: false }
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
