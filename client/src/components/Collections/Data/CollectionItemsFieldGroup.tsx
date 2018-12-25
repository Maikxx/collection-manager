import * as React from 'react'
import { FieldGroup } from '../../Core/Field/FieldGroup/FieldGroup'
import { ActionBar } from '../../Chrome/ActionBar/ActionBar'
import { List } from '../../Core/DataDisplay/List/List'
import { ListItem } from '../../Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../Core/Button/Button'

interface Props {}

export class CollectionItemsFieldGroup extends React.PureComponent<Props> {
    public render() {
        return (
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
        )
    }
}
