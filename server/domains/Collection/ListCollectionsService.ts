import { ApolloError } from 'apollo-server-express'
import { database } from '../../db/db'

export async function ListCollectionsService() {
    try {
        const { rows } = await database.query('SELECT * FROM collections;')

        return rows
    } catch (error) {
        throw new ApolloError(error.message, '500')
    }
}
