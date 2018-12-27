import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { RouteComponentProps } from 'react-router-dom'
import { Page } from '../../../../components/Core/Layout/Page/Page'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { routes } from '../../../routes'
import { GetCollectionQuery, GetCollectionQueryContent } from '../../../../components/Collections/Apollo/GetCollectionQuery'
import { BreadCrumbs } from '../../../../components/Core/Layout/BreadCrumbs/BreadCrumbs'
import { BreadCrumb } from '../../../../components/Core/Layout/BreadCrumbs/BreadCrumb'
import { TextLink } from '../../../../components/Core/Text/TextLink/TextLink'
import { CollectionDataFields } from '../../../../components/Collections/Data/CollectionDataFields'
import { List } from '../../../../components/Core/DataDisplay/List/List'
import { ListItem } from '../../../../components/Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../../../components/Core/Button/Button'
import { Header } from '../../../../components/Core/Layout/Header/Header'

interface Props extends RouteComponentProps<{ id: string }> {
    className?: string
}

export class CollectionsDataView extends React.Component<Props> {
    private bem = new BEM('CollectionsDataView')

    public render() {
        const { className } = this.props
        const { id } = this.props.match.params

        return (
            <Page
                className={this.bem.getClassName(className)}
                hasPageHeader={true}
                renderPageActions={this.renderPageActions}
            >
                <GetCollectionQuery variables={{ byId: id }}>
                    {({ loading, data, refetch }: GetCollectionQueryContent) => {
                        const { getCollection: collection } = data || { getCollection: undefined }
                        const { name } = collection || { name: undefined }

                        return (
                            <React.Fragment>
                                <Header>
                                    <BreadCrumbs>
                                        <BreadCrumb>
                                            <TextLink to={routes.collections.index}>
                                                Collections
                                            </TextLink>
                                        </BreadCrumb>
                                        <BreadCrumb isLoading={loading}>
                                            {name}
                                        </BreadCrumb>
                                    </BreadCrumbs>
                                </Header>
                                <Wrap>
                                    <CollectionDataFields
                                        collection={collection}
                                        refetchCollection={refetch}
                                    />
                                </Wrap>
                            </React.Fragment>
                        )
                    }}
                </GetCollectionQuery>
            </Page>
        )
    }

    private renderPageActions = () => {
        const { history } = this.props
        const { id } = this.props.match.params

        return (
            <List horizontal={true}>
                <ListItem right={true}>
                    <Button
                        onClick={() => history.push(routes.collections.detail.edit(id))}
                        type={ButtonType.action}
                    >
                        Edit collection
                    </Button>
                </ListItem>
            </List>
        )
    }
}
