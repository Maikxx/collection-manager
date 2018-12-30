import { EditCollectionArgs } from '../../api/collection/editCollection.mutation'
import { ApolloError } from 'apollo-server-express'
import { database } from '../../db/db'

export const EditCollectionService = async (args: EditCollectionArgs) => {
    const { collection } = args
    const { _id, name } = collection

    try {
        const { rows } = await database.query(
            'UPDATE collections SET name = $1 WHERE _id = $2 RETURNING *;',
            [ name, _id ]
        )

        return rows[0]
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
