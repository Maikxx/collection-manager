import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFunc } from 'react-apollo'
import { ApolloError } from 'apollo-client'

const ADD_COLLECTION_MUTATION = gql`
    mutation($collection: AddCollectionType!) {
        addCollection(collection: $collection) {
            _id
        }
    }
`

export interface AddCollectionMutationVariables {
    collection: {
        name: string
    }
}

export interface AddCollectionMutationResponse {
    collection: {
        _id: string
    }
}

export interface MutationContent {
    mutate: MutationFunc
    loading: boolean
    data?: AddCollectionMutationResponse
    error?: ApolloError
}

interface Props {
    children: any
}

export class AddCollectionMutation extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Mutation mutation={ADD_COLLECTION_MUTATION}>
                {(mutate, { loading, data, error }) => children({ mutate, loading, data, error } as MutationContent)}
            </Mutation>
        )
    }
}
