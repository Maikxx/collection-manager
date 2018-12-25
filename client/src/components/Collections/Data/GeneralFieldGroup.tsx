import * as React from 'react'
import { FieldGroup } from '../../Core/Field/FieldGroup/FieldGroup'
import { Field } from '../../Core/Field/Field/Field'
import { CollectionType } from '../../../types/Collection'

interface Props {
    collection?: CollectionType
}

export class GeneralFieldGroup extends React.PureComponent<Props> {
    public render() {
        const { collection } = this.props
        const { name, createdAt } = collection || { name: undefined, createdAt: undefined }

        return (
            <FieldGroup title={`General`}>
                <Field title={`Name`}>
                    {name}
                </Field>
                <Field title={`Created at`}>
                    {createdAt}
                </Field>
            </FieldGroup>
        )
    }
}
