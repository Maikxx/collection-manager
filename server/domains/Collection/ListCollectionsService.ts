import { ApolloError } from 'apollo-server-express'
import { database } from '../../db/db'

export const ListCollectionsService = async () => {
    try {
        const { rows } = await database.query('SELECT * FROM collections;')

        return rows
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
