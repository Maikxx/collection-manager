import * as React from 'react'
import { FieldCollection } from '../../Core/Field/FieldCollection/FieldCollection'
import { FieldGroup } from '../../Core/Field/FieldGroup/FieldGroup'
import { Field } from '../../Core/Field/Field/Field'
import { CollectionType, CollectedItemType } from '../../../types/Collection'
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
import { ReadableDate } from '../../Core/DataDisplay/Date/ReadableDate'
import { DeleteCollectedItemMutation, DeleteCollectedItemMutationFunction } from '../Apollo/DeleteCollectedItemMutation'

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

        if (!collection) {
            return null
        }

        const { _id, name, createdAt, collectedItems } = collection
        const { showModal } = this.state

        return (
            <FieldCollection>
                <FieldGroup title={`General`}>
                    <Field title={`Name`}>
                        {name}
                    </Field>
                    <Field title={`Created at`}>
                        <ReadableDate date={createdAt}/>
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
                                <TableCell>
                                    Added on
                                </TableCell>
                                <TableCell/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(collectedItems && collectedItems.length > 0) && this.renderCollectedItemTableRows(collectedItems)}
                        </TableBody>
                    </Table>
                </FieldGroup>
            </FieldCollection>
        )
    }

    private renderCollectedItemTableRows = (collectedItems: CollectedItemType[]) => {
        return collectedItems.map(item => (
            <TableRow key={item._id}>
                <TableCell>
                    {item.name}
                </TableCell>
                <TableCell>
                    <ReadableDate date={item.createdAt}/>
                </TableCell>
                <TableCell>
                    <DeleteCollectedItemMutation>
                        {(mutate, { loading }) => (
                            <Button
                                loading={loading}
                                onClick={() => this.onDelete(mutate, item._id)}
                                type={ButtonType.danger}
                            >
                                Delete {item.name}
                            </Button>
                        )}
                    </DeleteCollectedItemMutation>
                </TableCell>
            </TableRow>
        ))
    }

    private onDelete = async (mutateDelete: DeleteCollectedItemMutationFunction, id: number) => {
        const { refetchCollection } = this.props

        const response = await mutateDelete({ variables: { _id: id }})

        if (response && response.data && response.data.deleteCollectedItem) {
            if (refetchCollection) {
                refetchCollection({ silent: true })
            }
        }
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
