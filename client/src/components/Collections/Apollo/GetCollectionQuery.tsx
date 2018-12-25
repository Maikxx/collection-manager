import * as React from 'react'
import gql from 'graphql-tag'
import { Query, MutationFunc } from 'react-apollo'
import { MutationContent } from '../../../types/Apollo'
import { CollectionType } from '../../../types/Collection'

const GET_COLLECTION_QUERY = gql`
    query($byId: MongoID!) {
        getCollection(byId: $byId) {
            _id
            name
            createdAt
        }
    }
`

export interface GetCollectionQueryVariables {
    byId: string
}

export interface GetCollectionQueryResponse {
    getCollection?: CollectionType
}

export type GetCollectionMutationContent = MutationContent<GetCollectionQueryResponse>
export type GetCollectionMutationFunction = MutationFunc<GetCollectionQueryResponse, GetCollectionQueryVariables>

interface Props {
    children: any
    variables: GetCollectionQueryVariables
}

export class GetCollectionQuery extends React.Component<Props> {
    public render() {
        const { children, ...restProps } = this.props

        return (
            <Query
                query={GET_COLLECTION_QUERY}
                {...restProps}
            >
                {({ loading, error, data, refetch }) => (
                    children({ loading, error, data, refetch })
                )}
            </Query>
        )
    }
}
