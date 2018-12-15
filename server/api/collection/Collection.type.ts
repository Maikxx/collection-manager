import { GraphQLObjectType, GraphQLString } from 'graphql'

export const CollectionType = new GraphQLObjectType({
    name: 'CollectionType',
    fields: () => ({
        name: { type: GraphQLString },
    }),
})
