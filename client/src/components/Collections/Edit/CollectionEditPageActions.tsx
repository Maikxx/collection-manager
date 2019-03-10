import * as React from 'react'
import { List } from '../../Core/DataDisplay/List/List'
import { ListItem } from '../../Core/DataDisplay/List/ListItem'
import { DeleteCollectionMutation, DeleteCollectionMutationFunction } from '../Apollo/DeleteCollectionMutation'
import { Button, ButtonType } from '../../Core/Button/Button'

interface Props {
    loading?: boolean
    onCancel: () => void
    onRemove: (mutate: DeleteCollectionMutationFunction) => void
}

export class CollectionEditPageActions extends React.Component<Props> {
    public render() {
        const { loading, onCancel, onRemove } = this.props

        return (
            <List horizontal={true}>
                <ListItem>
                    <DeleteCollectionMutation>
                        {(mutate, { loading }) => (
                            <Button
                                loading={loading}
                                onClick={() => onRemove(mutate)}
                                type={ButtonType.danger}
                            >
                                Remove
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
