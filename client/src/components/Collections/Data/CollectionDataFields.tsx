import * as React from 'react'
import { FieldCollection } from '../../Core/Field/FieldCollection/FieldCollection'
import { FieldGroup } from '../../Core/Field/FieldGroup/FieldGroup'
import { Field } from '../../Core/Field/Field/Field'
import { CollectionType } from '../../../types/Collection'
import { ActionBar } from '../../Chrome/ActionBar/ActionBar'
import { List } from '../../Core/DataDisplay/List/List'
import { ListItem } from '../../Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../Core/Button/Button'

interface Props {
    collection?: CollectionType
}

export class CollectionDataFields extends React.Component<Props> {
    public render() {
        const { collection } = this.props
        const { name, createdAt } = collection || { name: undefined, createdAt: undefined }

        return (
            <FieldCollection>
                <FieldGroup title={`General`}>
                    <Field title={`Name`}>
                        {name}
                    </Field>
                    <Field title={`Created at`}>
                        {createdAt}
                    </Field>
                </FieldGroup>
                <FieldGroup title={`Owned items`}>
                    <ActionBar>
                        <List horizontal={true}>
                            <ListItem right={true}>
                                <Button type={ButtonType.action}>
                                    Add item
                                </Button>
                            </ListItem>
                        </List>
                    </ActionBar>
                </FieldGroup>
            </FieldCollection>
        )
    }
}
