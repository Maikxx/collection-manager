import * as React from 'react'
import { Modal } from '../../Core/Feedback/Modal/Modal'
import { FieldCollection } from '../../Core/Field/FieldCollection/FieldCollection'
import { Field } from '../../Core/Field/Field/Field'
import { Form, getFieldsFromSubmitEvent } from '../../Core/DataEntry/Form/Form'
import { Input } from '../../Core/DataEntry/Input/Input'
import { FieldCollectionFooter } from '../../Core/Field/FieldCollectionFooter/FieldCollectionFooter'
import { List } from '../../Core/DataDisplay/List/List'
import { ListItem } from '../../Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../Core/Button/Button'
import { AddCollectedItemMutation, AddCollectedItemMutationContent, AddCollectedItemMutationFunction } from '../Apollo/AddCollectedItemMutation'

interface Props {
    collectionId: number
    isOpen: boolean
    onSubmitSuccess: () => void
    onClose: () => void
}

export class AddCollectionItemModal extends React.Component<Props> {
    public render() {
        const { onClose, isOpen } = this.props

        return (
            <Modal
                open={isOpen}
                onClose={onClose}
                title={`Add collected item`}
            >
                <AddCollectedItemMutation>
                    {(mutate: AddCollectedItemMutationFunction, { loading }: AddCollectedItemMutationContent) => (
                        <Form onSubmit={this.onSubmit(mutate)} id={`addCollectedItemForm`}>
                            <FieldCollection>
                                <Field isLabel={true} title={`Name`}>
                                    <Input
                                        name={`name`}
                                        type={`text`}
                                        required={true}
                                    />
                                </Field>
                                <Field isLabel={true} title={`Description`}>
                                    <Input
                                        name={`description`}
                                        type={`text`}
                                    />
                                </Field>
                                <FieldCollectionFooter>
                                    <List horizontal={true}>
                                        <ListItem right={true}>
                                            <Button
                                                type={ButtonType.cancel}
                                                onClick={onClose}
                                            >
                                                Cancel
                                            </Button>
                                        </ListItem>
                                        <ListItem right={true}>
                                            <Button
                                                form={`addCollectedItemForm`}
                                                type={ButtonType.confirm}
                                                loading={loading}
                                            >
                                                Submit
                                            </Button>
                                        </ListItem>
                                    </List>
                                </FieldCollectionFooter>
                            </FieldCollection>
                        </Form>
                    )}
                </AddCollectedItemMutation>
            </Modal>
        )
    }

    private onSubmit = (mutate: AddCollectedItemMutationFunction) =>
        async (event: React.FormEvent<HTMLFormElement>) => {
            const { collectionId, onSubmitSuccess } = this.props

            const fields = getFieldsFromSubmitEvent(event)
            const response = await mutate({
                variables: {
                    collection: {
                        _id: collectionId,
                        name: fields.name,
                        description: fields.description || null,
                    },
                },
            })

            if (response && response.data && response.data.addCollectedItem) {
                onSubmitSuccess()
            }
        }
}
