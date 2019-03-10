import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType } from 'graphql'

import { GraphQLDate } from 'graphql-iso-date'

export const AddCollectedItemType = new GraphQLInputObjectType({
    name: 'AddCollectedItemType',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
    }),
})

export const CollectedItemType = new GraphQLObjectType({
    name: 'CollectedItemType',
    fields: () => ({
        _id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLNonNull(GraphQLDate) },
    }),
})
