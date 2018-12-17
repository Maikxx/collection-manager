import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { listCollections } from './collection/listCollections.query'
import { addCollection } from './collection/addCollection.mutation'
import { getCollection } from './collection/getCollection.query'

export const createSchema = () => new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
            getCollection: getCollection(),
            listCollections: listCollections(),
        }),
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: () => ({
            addCollection: addCollection(),
        }),
    }),
})
