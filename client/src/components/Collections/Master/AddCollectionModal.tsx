import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Modal } from '../../Core/Feedback/Modal/Modal'
import { FieldCollection } from '../../Core/Field/FieldCollection/FieldCollection'
import { Field } from '../../Core/Field/Field/Field'
import { Form } from '../../Core/DataEntry/Form/Form'
import { FieldGroup } from '../../Core/Field/FieldGroup/FieldGroup'
import { Input } from '../../Core/DataEntry/Input/Input'

interface Props {
    className?: string
    isOpen: boolean
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
                title={`Add collection`}
                onClose={onClose}
            >
                <Form>
                    <FieldCollection>
                        <FieldGroup title={`General`}>
                            <Field isLabel={true} title={`Name`}>
                                <Input name={`name`} type={`text`}/>
                            </Field>
                        </FieldGroup>
                    </FieldCollection>
                </Form>
            </Modal>
        )
    }
}
