import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { RouteComponentProps } from 'react-router-dom'
import { Page } from '../../../../components/Core/Layout/Page/Page'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { FieldCollection } from '../../../../components/Core/Field/FieldCollection/FieldCollection'
import { Loader } from '../../../../components/Core/Feedback/Loader/Loader'
import { routes } from '../../../routes'
import { GetCollectionQuery, GetCollectionMutationContent } from '../../../../components/Collections/Apollo/GetCollectionQuery'
import { CollectionItemsFieldGroup } from '../../../../components/Collections/Data/CollectionItemsFieldGroup'
import { GeneralFieldGroup } from '../../../../components/Collections/Data/GeneralFieldGroup'
import { DataViewHeader } from '../../../../components/Collections/Data/DataViewHeader'
import { DataViewPageActions } from '../../../../components/Collections/Data/DataViewPageActions'

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
                    {({ loading, data }: GetCollectionMutationContent) => {
                        if (loading) {
                            return <Loader />
                        }

                        if (!data) {
                            return 'No collection could be found'
                        }

                        const { getCollection: collection } = data
                        const { name } = collection || { name: undefined }

                        return (
                            <React.Fragment>
                                <DataViewHeader
                                    loading={loading}
                                    name={name}
                                    routeTo={routes.collections.index}
                                />
                                <Wrap>
                                    <FieldCollection>
                                        <GeneralFieldGroup collection={collection}/>
                                        <CollectionItemsFieldGroup />
                                    </FieldCollection>
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
            <DataViewPageActions
                onEditButtonClick={() => history.push(routes.collections.detail.edit(id))}
            />
        )
    }
}
