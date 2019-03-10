import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFunc } from 'react-apollo'
import { MutationContent } from '../../../types/Apollo'

const ADD_COLLECTED_ITEM_MUTATION = gql`
    mutation($collection: AddCollectedItemType!) {
        addCollectedItem(collection: $collection) {
            _id
        }
    }
`

export interface AddCollectedItemMutationVariables {
    collection: {
        _id: number
        name: string
        description: string | null
    }
}

export interface AddCollectedItemMutationResponse {
    addCollectedItem: {
        collection: {
            _id: number
        }
    }
}

export type AddCollectedItemMutationContent = MutationContent<AddCollectedItemMutationResponse>
export type AddCollectedItemMutationFunction = MutationFunc<AddCollectedItemMutationResponse, AddCollectedItemMutationVariables>

interface Props {
    children: (mutationFunction: AddCollectedItemMutationFunction, apolloProps: AddCollectedItemMutationContent) => JSX.Element
}

export class AddCollectedItemMutation extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Mutation mutation={ADD_COLLECTED_ITEM_MUTATION}>
                {(mutate, { loading, data, error }) => (
                    children(mutate, { loading, data, error })
                )}
            </Mutation>
        )
    }
}
