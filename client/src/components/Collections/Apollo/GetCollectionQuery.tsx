import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { QueryContent, RefetchFunction } from '../../../types/Apollo'
import { CollectionType } from '../../../types/Collection'

const GET_COLLECTION_QUERY = gql`
    query($byId: Int!) {
        getCollection(byId: $byId) {
            _id
            name
            createdAt
            collectedItems {
                _id
                name
            }
        }
    }
`

export interface GetCollectionQueryVariables {
    byId: number
}

export interface GetCollectionQueryResponse {
    getCollection?: CollectionType
}

export type GetCollectionQueryContent = QueryContent<GetCollectionQueryResponse>
export type GetCollectionRefetchFunction = RefetchFunction<GetCollectionQueryResponse>

interface Props {
    children: (apolloProps: GetCollectionQueryContent) => JSX.Element
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
