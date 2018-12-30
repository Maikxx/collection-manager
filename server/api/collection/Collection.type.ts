import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql'
import { GraphQLDate } from 'graphql-iso-date'

export const AddCollectionType = new GraphQLInputObjectType({
    name: 'AddCollectionType',
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
    }),
})

export const AddCollectedItemType = new GraphQLInputObjectType({
    name: 'AddCollectedItemType',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLInt) },
        collectedItemName: { type: GraphQLNonNull(GraphQLString) },
    }),
})

export const CollectedItemType = new GraphQLObjectType({
    name: 'CollectedItemType',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLNonNull(GraphQLDate) },
    }),
})

export const CollectionType = new GraphQLObjectType({
    name: 'CollectionType',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        createdAt: { type: GraphQLNonNull(GraphQLDate) },
        collectedItems: { type: GraphQLList(CollectedItemType) },
    }),
})

export const EditCollectionType = new GraphQLInputObjectType({
    name: 'EditCollectionType',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
    }),
})

export const ListCollectionType = new GraphQLObjectType({
    name: 'ListCollectionType',
    fields: () => ({
        nodes: { type: GraphQLList(CollectionType) },
    }),
})
