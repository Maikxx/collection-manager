import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { listCollections } from './collection/listCollections.query'
import { addCollection } from './collection/addCollection.mutation'
import { getCollection } from './collection/getCollection.query'
import { deleteCollection } from './collection/deleteCollection.mutation'
import { editCollection } from './collection/editCollection.mutation'

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
            deleteCollection: deleteCollection(),
            editCollection: editCollection(),
        }),
    }),
})
