import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { ApolloError } from 'apollo-client'

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

export interface QueryContent {
    loading: boolean
    error?: ApolloError
    data?: ListCollectionsQueryResponse
}

export class ListCollectionsQuery extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Query query={LIST_COLLECTIONS_QUERY}>
                {({ loading, error, data }) => children({ loading, error, data })}
            </Query>
        )
    }
}
