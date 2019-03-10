import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql'
import { GraphQLDate } from 'graphql-iso-date'
import { CollectedItemType } from '../collectedItem/CollectedItem.type'

export const AddCollectionType = new GraphQLInputObjectType({
    name: 'AddCollectionType',
    fields: () => ({
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
    }),
})

export const CollectionType = new GraphQLObjectType({
    name: 'CollectionType',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLNonNull(GraphQLDate) },
        collectedItems: { type: GraphQLList(CollectedItemType) },
    }),
})

export const EditCollectionType = new GraphQLInputObjectType({
    name: 'EditCollectionType',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
    }),
})

export const ListCollectionType = new GraphQLObjectType({
    name: 'ListCollectionType',
    fields: () => ({
        nodes: { type: GraphQLList(CollectionType) },
    }),
})
