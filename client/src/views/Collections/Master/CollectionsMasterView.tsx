import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Page } from '../../../components/Core/Layout/Page/Page'
import {
    ListCollectionsQuery,
    QueryContent,
    RefetchFunction,
    ListCollectionsQueryResponse,
} from '../../../components/Collections/Queries/ListCollectionsQuery'
import { Loader } from '../../../components/Core/Feedback/Loader/Loader'
import { PageHeader } from '../../../components/Chrome/PageHeader/PageHeader'
import { Wrap } from '../../../components/Core/Layout/Wrap/Wrap'
import { TableView } from '../../../components/Core/DataDisplay/Table/TableView/TableView'
import { Table } from '../../../components/Core/DataDisplay/Table/Table/Table'
import { TableHead } from '@material-ui/core'
import { TableRow } from '../../../components/Core/DataDisplay/Table/Table/TableRow'
import { TableCell } from '../../../components/Core/DataDisplay/Table/Table/TableCell'
import { TableBody } from '../../../components/Core/DataDisplay/Table/Table/TableBody'
import { ActionBar } from '../../../components/Chrome/ActionBar/ActionBar'
import { List } from '../../../components/Core/DataDisplay/List/List'
import { ListItem } from '../../../components/Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../../components/Core/Button/Button'
import { AddCollectionModal } from '../../../components/Collections/Master/AddCollectionModal'

interface Props {
    className?: string
}

interface State {
    showAddCollectionModal: boolean
}

export class CollectionsMasterView extends React.Component<Props, State> {
    public state: State = {
        showAddCollectionModal: false,
    }

    private bem = new BEM('CollectionsMasterView')

    public render() {
        const { className } = this.props

        return (
            <Page className={this.bem.getClassName(className)}>
                <ListCollectionsQuery>
                    {({ data, loading, error, refetch }: QueryContent) => {
                        if (loading || !data) {
                            return <Loader />
                        }

                        return (
                            <React.Fragment>
                                <PageHeader />
                                <Wrap>
                                    {this.renderActionBar(refetch)}
                                </Wrap>
                                <TableView>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    Name
                                                </TableCell>
                                                <TableCell>
                                                    Created at
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.renderTableRows(data)}
                                        </TableBody>
                                    </Table>
                                </TableView>
                            </React.Fragment>
                        )
                    }}
                </ListCollectionsQuery>
            </Page>
        )
    }

    private renderTableRows = (data: ListCollectionsQueryResponse) => {
        const { listCollections } = data
        const { nodes: collections } = listCollections

        if (!collections || !collections.length) {
            return null
        }

        return collections.map(collection => (
            <TableRow key={collection._id}>
                <TableCell>
                    {collection.name}
                </TableCell>
                <TableCell>
                    {collection.createdAt}
                </TableCell>
            </TableRow>
        ))
    }

    private renderActionBar = (refetch?: RefetchFunction) => {
        const { showAddCollectionModal } = this.state

        return (
            <ActionBar>
                <List horizontal={true}>
                    <ListItem right={true}>
                        <Button
                            type={ButtonType.action}
                            onClick={this.toggleModal}
                        >
                            Add collection
                        </Button>
                        <AddCollectionModal
                            isOpen={showAddCollectionModal}
                            onSubmitSuccess={() => this.onSubmitSuccess(refetch)}
                            onClose={this.toggleModal}
                        />
                    </ListItem>
                </List>
            </ActionBar>
        )
    }

    private onSubmitSuccess = (refetch?: RefetchFunction) => {
        this.toggleModal()

        if (refetch) {
            refetch()
        }
    }

    private toggleModal = () => {
        const { showAddCollectionModal } = this.state

        this.setState({ showAddCollectionModal: !showAddCollectionModal })
    }
}
