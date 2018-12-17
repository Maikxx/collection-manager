import { GraphQLScalarType, Kind } from 'graphql'
import { ObjectId } from 'mongodb'

export const MongoID = new GraphQLScalarType({
    name: 'MongoID',
    serialize: (objectId: ObjectId) => objectId.toHexString(),
    parseValue: (stringId: string) => stringId && new ObjectId(stringId),
    parseLiteral: ast => {
        if (ast.kind === Kind.STRING) {
            if (ast.value) {
                return new ObjectId(ast.value)
            }
        }

        return null
    },
})
