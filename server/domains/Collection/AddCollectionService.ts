import { AddCollectionFields } from '../../api/collection/addCollection.mutation'
import { ApolloError } from 'apollo-server-express'
import { database } from '../../db/db'

export async function AddCollectionService(args: AddCollectionFields) {
    const { collection: { name, description } } = args

    try {
        const { rowCount: existingRowCount } = await database.query(
            'SELECT name FROM collections WHERE LOWER(name) = LOWER($1);',
            [name]
        )

        if (existingRowCount > 0) {
            throw new ApolloError('Name already exists', '409')
        }

        const { rows } = await database.query(
            'INSERT INTO collections (name, description) VALUES ($1, $2) RETURNING *;',
            [ name, description ]
        )

        return rows[0]
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
