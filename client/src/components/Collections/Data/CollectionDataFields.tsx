import * as React from 'react'
import { FieldCollection } from '../../Core/Field/FieldCollection/FieldCollection'
import { FieldGroup } from '../../Core/Field/FieldGroup/FieldGroup'
import { Field } from '../../Core/Field/Field/Field'
import { CollectionType } from '../../../types/Collection'
import { ActionBar } from '../../Chrome/ActionBar/ActionBar'
import { List } from '../../Core/DataDisplay/List/List'
import { ListItem } from '../../Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../Core/Button/Button'
import { Table } from '../../Core/DataDisplay/Table/Table/Table'
import { TableHead } from '@material-ui/core'
import { TableRow } from '../../Core/DataDisplay/Table/Table/TableRow'
import { TableCell } from '../../Core/DataDisplay/Table/Table/TableCell'
import { TableBody } from '../../Core/DataDisplay/Table/Table/TableBody'
import { AddCollectionItemModal } from './AddCollectionItemModal'
import { GetCollectionRefetchFunction } from '../Apollo/GetCollectionQuery'

interface Props {
    collection?: CollectionType
    refetchCollection?: GetCollectionRefetchFunction
}

interface State {
    showModal: boolean
}

export class CollectionDataFields extends React.Component<Props, State> {
    public state: State = {
        showModal: false,
    }

    public render() {
        const { collection } = this.props
        const { _id, name, createdAt } = collection || { _id: undefined, name: undefined, createdAt: undefined }
        const { showModal } = this.state

        if (!_id) {
            return null
        }

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
                                <Button
                                    onClick={this.toggleModal}
                                    type={ButtonType.action}
                                >
                                    Add item
                                </Button>
                                <AddCollectionItemModal
                                    collectionId={_id}
                                    isOpen={showModal}
                                    onSubmitSuccess={() => this.onSubmitSuccess()}
                                    onClose={this.toggleModal}
                                />
                            </ListItem>
                        </List>
                    </ActionBar>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Name
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    Call of Duty
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </FieldGroup>
            </FieldCollection>
        )
    }

    private onSubmitSuccess = () => {
        const { refetchCollection } = this.props

        this.toggleModal()

        if (refetchCollection) {
            refetchCollection({ silent: true })
        }
    }

    private toggleModal = () => {
        const { showModal } = this.state

        this.setState({ showModal: !showModal })
    }
}