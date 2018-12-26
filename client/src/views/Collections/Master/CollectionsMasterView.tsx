import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Page } from '../../../components/Core/Layout/Page/Page'
import {
    ListCollectionsQuery,
    ListCollectionsRefetchFunction,
    ListCollectionsQueryContent,
} from '../../../components/Collections/Apollo/ListCollectionsQuery'
import { Loader } from '../../../components/Core/Feedback/Loader/Loader'
import { Wrap } from '../../../components/Core/Layout/Wrap/Wrap'
import { TableView } from '../../../components/Core/DataDisplay/Table/TableView/TableView'
import { ActionBar } from '../../../components/Chrome/ActionBar/ActionBar'
import { List } from '../../../components/Core/DataDisplay/List/List'
import { ListItem } from '../../../components/Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../../components/Core/Button/Button'
import { AddCollectionModal } from '../../../components/Collections/Master/AddCollectionModal'
import { Header } from '../../../components/Core/Layout/Header/Header'
import { BreadCrumbs } from '../../../components/Core/Layout/BreadCrumbs/BreadCrumbs'
import { BreadCrumb } from '../../../components/Core/Layout/BreadCrumbs/BreadCrumb'
import { RouteComponentProps } from 'react-router-dom'
import { CollectionsTable } from '../../../components/Collections/Master/CollectionsTable'

interface Props extends RouteComponentProps {
    className?: string
    onQueryLoaded?: (refetchFunction: ListCollectionsRefetchFunction) => void
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
                <Header>
                    <BreadCrumbs>
                        <BreadCrumb>
                            Collections
                        </BreadCrumb>
                    </BreadCrumbs>
                </Header>
                <ListCollectionsQuery>
                    {({ data, loading, refetch }: ListCollectionsQueryContent) => {
                        const { onQueryLoaded } = this.props
                        const { showAddCollectionModal } = this.state

                        if (loading || !data) {
                            return <Loader />
                        }

                        if (refetch && onQueryLoaded) {
                            onQueryLoaded(refetch)
                        }

                        const { listCollections } = data
                        const { nodes: collections } = listCollections

                        return (
                            <React.Fragment>
                                <Wrap>
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
                                </Wrap>
                                <TableView>
                                    <CollectionsTable collections={collections}/>
                                </TableView>
                            </React.Fragment>
                        )
                    }}
                </ListCollectionsQuery>
            </Page>
        )
    }

    private onSubmitSuccess = (refetch?: ListCollectionsRefetchFunction) => {
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
