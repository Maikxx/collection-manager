import * as React from 'react'
import gql from 'graphql-tag'
import { Query, OperationVariables } from 'react-apollo'
import { ApolloError, ApolloQueryResult } from 'apollo-client'

const LIST_COLLECTIONS_QUERY = gql`
    query {
        listCollections {
            nodes {
                _id
                createdAt
                name
            }
        }
    }
`

interface Props {
    children: any
}

export interface ListCollectionsQueryResponse {
    listCollections: {
        nodes: {
            _id: string
            createdAt: Date
            name: string
        }[]
    }
}

export type RefetchFunction = (variables?: OperationVariables) => Promise<ApolloQueryResult<ListCollectionsQueryResponse>>

export interface QueryContent {
    loading: boolean
    error?: ApolloError
    data?: ListCollectionsQueryResponse
    refetch?: RefetchFunction
}

export class ListCollectionsQuery extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Query query={LIST_COLLECTIONS_QUERY}>
                {({ loading, error, data, refetch }) => children({ loading, error, data, refetch })}
            </Query>
        )
    }
}
