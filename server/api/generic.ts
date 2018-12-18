import { GraphQLObjectType, GraphQLBoolean } from 'graphql'

export const GenericMutationResponseType = new GraphQLObjectType({
    name: 'GenericMutationResponseType',
    fields: () => ({
        success: { type: GraphQLBoolean },
    }),
})
