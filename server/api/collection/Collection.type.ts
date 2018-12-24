import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull } from 'graphql'
import { GraphQLDate } from 'graphql-iso-date'
import { MongoID } from '../../scalars/MongoID'

export const AddCollectionType = new GraphQLInputObjectType({
    name: 'AddCollectionType',
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
    }),
})

export const CollectionType = new GraphQLObjectType({
    name: 'CollectionType',
    fields: () => ({
        _id: { type: GraphQLNonNull(MongoID) },
        name: { type: GraphQLString },
        createdAt: { type: GraphQLDate },
    }),
})

export const EditCollectionType = new GraphQLInputObjectType({
    name: 'EditCollectionType',
    fields: () => ({
        _id: { type: GraphQLNonNull(MongoID) },
        name: { type: GraphQLNonNull(GraphQLString) },
    }),
})

export const ListCollectionType = new GraphQLObjectType({
    name: 'ListCollectionType',
    fields: () => ({
        nodes: { type: GraphQLList(CollectionType) },
    }),
})
