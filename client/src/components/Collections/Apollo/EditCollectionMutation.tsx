import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation, MutationFunc } from 'react-apollo'
import { MutationContent } from '../../../types/Apollo'

const EDIT_COLLECTION_MUTATION = gql`
    mutation($collection: EditCollectionType!) {
        editCollection(collection: $collection) {
            _id
        }
    }
`

export interface EditCollectionMutationVariables {
    collection: {
        _id: number
        name: string
    }
}

export interface EditCollectionMutationResponse {
    editCollection: {
        collection: {
            _id: number
        }
    }
}

export type EditCollectionMutationContent = MutationContent<EditCollectionMutationResponse>
export type EditCollectionMutationFunction = MutationFunc<EditCollectionMutationResponse, EditCollectionMutationVariables>

interface Props {
    children: (mutateFunction: EditCollectionMutationFunction, apolloProps: EditCollectionMutationContent) => JSX.Element
}

export class EditCollectionMutation extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Mutation mutation={EDIT_COLLECTION_MUTATION}>
                {(mutate, { loading, data, error }) => (
                    children(mutate, { loading, data, error })
                )}
            </Mutation>
        )
    }
}
