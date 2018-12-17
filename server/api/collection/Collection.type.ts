import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql'
import { GraphQLDate } from 'graphql-iso-date'
import { MongoID } from '../../scalars/MongoID'

export const AddCollectionType = new GraphQLInputObjectType({
    name: 'AddCollectionType',
    fields: {
        name: { type: GraphQLString },
    },
})

export const CollectionType = new GraphQLObjectType({
    name: 'CollectionType',
    fields: () => ({
        _id: { type: MongoID },
        name: { type: GraphQLString },
        createdAt: { type: GraphQLDate },
    }),
})

export const ListCollectionType = new GraphQLObjectType({
    name: 'ListCollectionType',
    fields: () => ({
        nodes: { type: GraphQLList(CollectionType) },
    }),
})
