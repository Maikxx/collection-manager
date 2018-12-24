import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { RefetchFunction, QueryContent } from '../../../types/Apollo'

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

export interface ListCollectionsQueryResponse {
    listCollections: {
        nodes: {
            _id: string
            createdAt: Date
            name: string
        }[]
    }
}

export type ListCollectionsRefetchFunction = RefetchFunction<ListCollectionsQueryResponse>
export type ListCollectionsQueryContent = QueryContent<ListCollectionsQueryResponse>

interface Props {
    children: any
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
