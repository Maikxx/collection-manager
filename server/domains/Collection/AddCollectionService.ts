import { AddCollectionFields } from '../../api/collection/addCollection.mutation'
import { ApolloError } from 'apollo-server-express'
import { database } from '../../db/db'

export const AddCollectionService = async (args: AddCollectionFields) => {
    const { name } = args.collection

    try {
        const { rowCount: existingRowCount } = await database.query(
            'SELECT name FROM collections WHERE LOWER(name) = LOWER($1);',
            [name]
        )

        if (existingRowCount > 0) {
            throw new ApolloError('Name already exists', '409')
        }

        const { rows } = await database.query(
            'INSERT INTO collections (name) VALUES ($1) RETURNING *;',
            [name]
        )

        return rows[0]
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
