import * as React from 'react'
import { List } from '../../Core/DataDisplay/List/List'
import { ListItem } from '../../Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../Core/Button/Button'

interface Props {
    onEditButtonClick: () => void
}

export class DataViewPageActions extends React.PureComponent<Props> {
    public render() {
        const { onEditButtonClick } = this.props

        return (
            <List horizontal={true}>
                <ListItem right={true}>
                    <Button
                        onClick={() => onEditButtonClick()}
                        type={ButtonType.action}
                    >
                        Edit collection
                    </Button>
                </ListItem>
            </List>
        )
    }
}
