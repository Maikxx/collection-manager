import { EditCollectionArgs } from '../../api/collection/editCollection.mutation'
import { ApolloError } from 'apollo-server-express'
import { database } from '../../db/db'

export async function EditCollectionService(args: EditCollectionArgs) {
    const { collection: { _id, name, description } } = args

    try {
        const { rows } = await database.query(
            `UPDATE collections
            SET name = $1, description = $3
            WHERE _id = $2
            RETURNING *;`,
            [ name, _id, description ]
        )

        return rows[0]
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
