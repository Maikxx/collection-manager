import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { RefetchFunction, QueryContent } from '../../../types/Apollo'
import { CollectionType } from '../../../types/Collection'

const LIST_COLLECTIONS_QUERY = gql`
    query {
        listCollections {
            nodes {
                _id
                createdAt
                name
                collectedItems {
                    _id
                    name
                }
            }
        }
    }
`

export interface ListCollectionsQueryResponse {
    listCollections: {
        nodes: CollectionType[]
    }
}

export type ListCollectionsRefetchFunction = RefetchFunction<ListCollectionsQueryResponse>
export type ListCollectionsQueryContent = QueryContent<ListCollectionsQueryResponse>

interface Props {
    children: (apolloProps: ListCollectionsQueryContent) => JSX.Element
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
