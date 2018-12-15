import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { listCollections } from './collection/listCollections.query'

export const createSchema = () => new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            listCollections: listCollections(),
        }),
    }),
})
