import * as React from 'react'
import { List } from '../../Core/DataDisplay/List/List'
import { ListItem } from '../../Core/DataDisplay/List/ListItem'
import { DeleteCollectionMutation, DeleteCollectionMutationContent, DeleteCollectionMutationFunction } from '../Apollo/DeleteCollectionMutation'
import { Button, ButtonType } from '../../Core/Button/Button'

interface Props {
    loading?: boolean
    onCancel: () => void
    onDelete: (mutate: DeleteCollectionMutationFunction) => void
}

export class EditViewPageActions extends React.Component<Props> {
    public render() {
        const { loading, onCancel, onDelete } = this.props

        return (
            <List horizontal={true}>
                <ListItem>
                    <DeleteCollectionMutation>
                        {(mutate: DeleteCollectionMutationFunction, { loading }: DeleteCollectionMutationContent) => (
                            <Button
                                loading={loading}
                                onClick={() => onDelete(mutate)}
                                type={ButtonType.danger}
                            >
                                Delete
                            </Button>
                        )}
                    </DeleteCollectionMutation>
                </ListItem>
                <ListItem right={true}>
                    <Button
                        onClick={() => onCancel()}
                        type={ButtonType.cancel}
                    >
                        Cancel
                    </Button>
                </ListItem>
                <ListItem right={true}>
                    <Button
                        form={`editCollectionForm`}
                        loading={loading}
                        type={ButtonType.confirm}
                    >
                        Save
                    </Button>
                </ListItem>
            </List>
        )
    }
}
