import { GraphQLInt, GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from 'graphql'

export interface AddCollectionFields {
    name: string
}

export const AddCollectionType = new GraphQLInputObjectType({
    name: 'AddCollectionType',
    fields: {
        name: { type: GraphQLString },
    },
})

export const CollectionType = new GraphQLObjectType({
    name: 'CollectionType',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
    }),
})
