import * as React from 'react'
import { MutationContent } from '../../../types/Apollo'
import { MutationFunc, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

const DELETE_COLLECTED_ITEM_MUTATION = gql`
    mutation($_id: Int!) {
        deleteCollectedItem(_id: $_id) {
            success
        }
    }
`

export interface DeleteCollectedItemMutationResponse {
    deleteCollectedItem?: {
        success?: boolean
    }
}

export interface DeleteCollectedItemMutationVariables {
    _id: number
}

export type DeleteCollectedItemMutationContent = MutationContent<DeleteCollectedItemMutationResponse>
export type DeleteCollectedItemMutationFunction = MutationFunc<DeleteCollectedItemMutationResponse, DeleteCollectedItemMutationVariables>

interface Props {
    children: (mutationFunction: DeleteCollectedItemMutationFunction, apolloProps: DeleteCollectedItemMutationContent) => JSX.Element
}

export class DeleteCollectedItemMutation extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Mutation mutation={DELETE_COLLECTED_ITEM_MUTATION}>
                {(mutate, { loading, data, error }) => (
                    children(mutate, { loading, data, error })
                )}
            </Mutation>
        )
    }
}
