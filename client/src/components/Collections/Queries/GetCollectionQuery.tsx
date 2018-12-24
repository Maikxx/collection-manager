import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

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
    getCollection?: {
        _id: string
        name: string
        createdAt?: Date
    }
}

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
