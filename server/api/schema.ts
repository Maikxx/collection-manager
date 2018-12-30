import { GraphQLSchema, GraphQLObjectType } from 'graphql'
import { listCollections } from './collection/listCollections.query'
import { addCollection } from './collection/addCollection.mutation'
import { getCollection } from './collection/getCollection.query'
import { deleteCollection } from './collection/deleteCollection.mutation'
import { editCollection } from './collection/editCollection.mutation'
import { addCollectedItem } from './collectedItem/addCollectedItem.mutation'
import { deleteCollectedItem } from './collectedItem/deleteCollectedItem.mutation'

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
            addCollectedItem: addCollectedItem(),
            deleteCollection: deleteCollection(),
            deleteCollectedItem: deleteCollectedItem(),
            editCollection: editCollection(),
        }),
    }),
})
