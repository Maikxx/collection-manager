import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Modal } from '../../Core/Feedback/Modal/Modal'
import { FieldCollection } from '../../Core/Field/FieldCollection/FieldCollection'
import { Field } from '../../Core/Field/Field/Field'
import { Form, getFieldsFromSubmitEvent } from '../../Core/DataEntry/Form/Form'
import { Input } from '../../Core/DataEntry/Input/Input'
import { FieldCollectionFooter } from '../../Core/Field/FieldCollectionFooter/FieldCollectionFooter'
import { List } from '../../Core/DataDisplay/List/List'
import { ListItem } from '../../Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../Core/Button/Button'
import { AddCollectionMutation, AddCollectionMutationResponse } from '../Apollo/AddCollectionMutation'
import { MutationFunc } from 'react-apollo'
import { MutationContent } from '../../../types/Apollo'

interface Props {
    className?: string
    isOpen: boolean
    onSubmitSuccess: () => void
    onClose: () => void
}

export class AddCollectionModal extends React.Component<Props> {
    private bem = new BEM('AddCollectionModal')

    public render() {
        const { className, onClose, isOpen } = this.props

        return (
            <Modal
                className={this.bem.getClassName(className)}
                open={isOpen}
                onClose={onClose}
                title={`Add collection`}
            >
                <AddCollectionMutation>
                    {(mutate: MutationFunc, { loading }: MutationContent<AddCollectionMutationResponse>) => (
                        <Form onSubmit={this.onSubmit(mutate)} id={`addCollectionForm`}>
                            <FieldCollection>
                                <Field isLabel={true} title={`Name`}>
                                    <Input name={`name`} type={`text`}/>
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

    private onSubmit = (mutateFunction: MutationFunc) => async (event: React.FormEvent<HTMLFormElement>) => {
        const { onSubmitSuccess } = this.props

        const fields = getFieldsFromSubmitEvent(event)
        const response = await mutateFunction({
            variables: {
                collection: {
                    name: fields.name,
                },
            },
        })

        if (response && response.data && response.data.addCollection) {
            onSubmitSuccess()
        }
    }
}
