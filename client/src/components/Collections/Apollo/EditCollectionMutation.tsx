import * as React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const EDIT_COLLECTION_MUTATION = gql`
    mutation($collection: EditCollectionType!) {
        editCollection(collection: $collection) {
            _id
        }
    }
`

export interface EditCollectionMutationVariables {
    collection: {
        _id: string
        name: string
    }
}

export interface EditCollectionMutationResponse {
    editCollection: {
        collection: {
            _id: string
        }
    }
}

interface Props {
    children: any
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
