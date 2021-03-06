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
import { AddCollectionMutation, AddCollectionMutationFunction } from '../Apollo/AddCollectionMutation'

interface Props {
    className?: string
    isOpen: boolean
    onSubmitSuccess: () => void
    onClose: () => void
}

export class AddCollectionModal extends React.Component<Props> {
    public render() {
        const { onClose, isOpen } = this.props

        return (
            <Modal
                open={isOpen}
                onClose={onClose}
                title={`Add collection`}
            >
                <AddCollectionMutation>
                    {(mutate, { loading }) => (
                        <Form onSubmit={this.onSubmit(mutate)} id={`addCollectionForm`}>
                            <FieldCollection>
                                <Field isLabel={true} title={`Name`}>
                                    <Input name={`name`} type={`text`}/>
                                </Field>
                                <Field isLabel={true} title={`Description`}>
                                    <Input name={`description`} type={`text`}/>
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
                                                form={`addCollectionForm`}
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
                </AddCollectionMutation>
            </Modal>
        )
    }

    private onSubmit = (mutate: AddCollectionMutationFunction) =>
        async (event: React.FormEvent<HTMLFormElement>) => {
            const { onSubmitSuccess } = this.props

            const fields = getFieldsFromSubmitEvent(event)
            const response = await mutate({
                variables: {
                    collection: {
                        name: fields.name,
                        description: fields.description || null,
                    },
                },
            })

            if (response && response.data && response.data.addCollection) {
                onSubmitSuccess()
            }
        }
}
