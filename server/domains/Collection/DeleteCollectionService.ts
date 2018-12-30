import { DeleteCollectionFields } from '../../api/collection/deleteCollection.mutation'
import { ApolloError } from 'apollo-server-express'
import { database } from '../../db/db'

export const DeleteCollectionService = async (args: DeleteCollectionFields) => {
    const { _id } = args
    try {
        const { rowCount } = await database.query(
            'DELETE FROM collections WHERE _id = $1;',
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
