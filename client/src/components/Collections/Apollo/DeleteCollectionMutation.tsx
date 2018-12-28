import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFunc } from 'react-apollo'
import { MutationContent } from '../../../types/Apollo'

const DELETE_COLLECTION_MUTATION = gql`
    mutation($_id: MongoID!) {
        deleteCollection(_id: $_id) {
            success
        }
    }
`

export interface DeleteCollectionMutationResponse {
    deleteCollection?: {
        success?: boolean
    }
}

export interface DeleteCollectionMutationVariables {
    _id: string
}

export type DeleteCollectionMutationContent = MutationContent<DeleteCollectionMutationResponse>
export type DeleteCollectionMutationFunction = MutationFunc<DeleteCollectionMutationResponse, DeleteCollectionMutationVariables>

interface Props {
    children: (mutationFunction: DeleteCollectionMutationFunction, apolloProps: DeleteCollectionMutationContent) => JSX.Element
}

export class DeleteCollectionMutation extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Mutation mutation={DELETE_COLLECTION_MUTATION}>
                {(mutate, { loading, data, error }) => (
                    children(mutate, { loading, data, error })
                )}
            </Mutation>
        )
    }
}
