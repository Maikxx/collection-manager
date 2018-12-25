import * as React from 'react'
import { FieldGroup } from '../../Core/Field/FieldGroup/FieldGroup'
import { Field } from '../../Core/Field/Field/Field'
import { Input } from '../../Core/DataEntry/Input/Input'
import { CollectionType } from '../../../types/Collection'

interface Props {
    collection?: CollectionType
}

export class EditViewGeneralFieldGroup extends React.Component<Props> {
    public render() {
        const { collection } = this.props
        const { name, createdAt } = collection || { name: undefined, createdAt: undefined }

        return (
            <FieldGroup title={`General`}>
                <Field title={`Name`}>
                    <Input
                        name={`name`}
                        type={`text`}
                        defaultValue={name}
                    />
                </Field>
                <Field title={`Created at`}>
                    <Input
                        name={`createdAt`}
                        type={`date`}
                        defaultValue={createdAt}
                        disabled={true}
                    />
                </Field>
            </FieldGroup>
        )
    }
}
