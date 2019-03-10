import * as React from 'react'
import { FieldCollection } from '../../Core/Field/FieldCollection/FieldCollection'
import { FieldGroup } from '../../Core/Field/FieldGroup/FieldGroup'
import { Field } from '../../Core/Field/Field/Field'
import { CollectionType } from '../../../types/Collection'
import { Input } from '../../Core/DataEntry/Input/Input'
import { Loader } from '../../Core/Feedback/Loader/Loader'

interface Props {
    collection?: CollectionType
}

export class CollectionEditFields extends React.Component<Props> {
    public render() {
        const { collection } = this.props

        if (!collection) {
            return <Loader/>
        }

        const { name, createdAt, description } = collection

        return (
            <FieldCollection>
                <FieldGroup title={`General`}>
                    <Field title={`Name`}>
                        <Input
                            defaultValue={name}
                            name={`name`}
                            type={`text`}
                        />
                    </Field>
                    <Field title={`Description`}>
                        <Input
                            defaultValue={description}
                            name={`description`}
                            type={`text`}
                        />
                    </Field>
                    <Field title={`Created at`}>
                        <Input
                            defaultValue={createdAt}
                            disabled={true}
                            name={`createdAt`}
                            type={`date`}
                        />
                    </Field>
                </FieldGroup>
            </FieldCollection>
        )
    }
}
