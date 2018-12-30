import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { RouteComponentProps } from 'react-router-dom'
import { Page } from '../../../../components/Core/Layout/Page/Page'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { routes } from '../../../routes'
import { DeleteCollectionMutationFunction } from '../../../../components/Collections/Apollo/DeleteCollectionMutation'
import { ListCollectionsRefetchFunction } from '../../../../components/Collections/Apollo/ListCollectionsQuery'
import { GetCollectionQuery } from '../../../../components/Collections/Apollo/GetCollectionQuery'
import {
    EditCollectionMutation,
    EditCollectionMutationContent,
    EditCollectionMutationFunction
} from '../../../../components/Collections/Apollo/EditCollectionMutation'
import { Form, getFieldsFromSubmitEvent } from '../../../../components/Core/DataEntry/Form/Form'
import { CollectionEditPageActions } from '../../../../components/Collections/Edit/CollectionEditPageActions'
import { Header } from '../../../../components/Core/Layout/Header/Header'
import { BreadCrumbs } from '../../../../components/Core/Layout/BreadCrumbs/BreadCrumbs'
import { BreadCrumb } from '../../../../components/Core/Layout/BreadCrumbs/BreadCrumb'
import { TextLink } from '../../../../components/Core/Text/TextLink/TextLink'
import { CollectionEditFields } from '../../../../components/Collections/Edit/CollectionEditFields'

interface Props extends RouteComponentProps<{ id: string }> {
    className?: string
    refetch?: ListCollectionsRefetchFunction
}

export class CollectionsEditView extends React.Component<Props> {
    private bem = new BEM('CollectionsEditView')

    public render() {
        return (
            <EditCollectionMutation>
               {this.renderForm}
            </EditCollectionMutation>
        )
    }

    private renderForm = (mutate: EditCollectionMutationFunction, { loading }: EditCollectionMutationContent) => {
        const { className } = this.props
        const { id } = this.props.match.params

        return (
            <Form onSubmit={this.onSubmit(mutate)} id={`editCollectionForm`}>
                <Page
                    className={this.bem.getClassName(className)}
                    hasPageHeader={true}
                    renderPageActions={() => this.renderPageActions(loading)}
                >
                    <GetCollectionQuery variables={{ byId: Number(id) }}>
                        {({ data, loading }) => {
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
                                        <CollectionEditFields collection={collection}/>
                                    </Wrap>
                                </React.Fragment>
                            )
                        }}
                    </GetCollectionQuery>
                </Page>
            </Form>
        )
    }

    private renderPageActions = (loading: boolean) => {
        const { history } = this.props
        const { id } = this.props.match.params

        return (
            <CollectionEditPageActions
                loading={loading}
                onDelete={this.onDelete}
                onCancel={() => history.push(routes.collections.detail.data(id))}
            />
        )
    }

    private onSubmit = (mutateEdit: EditCollectionMutationFunction) =>
        async (event: React.FormEvent<HTMLFormElement>) => {
            const { history, match, refetch } = this.props
            const { id } = match.params

            const fields = getFieldsFromSubmitEvent(event)

            const response = await mutateEdit({
                variables: {
                    collection: {
                        _id: Number(id),
                        name: fields.name,
                    },
                },
            })

            if (response && response.data && response.data.editCollection) {
                if (refetch) {
                    refetch({ silent: true })
                }

                history.push(routes.collections.detail.data(id))
            }
        }

    private onDelete = async (mutateDelete: DeleteCollectionMutationFunction) => {
        const { history, match, refetch } = this.props
        const { id } = match.params

        const response = await mutateDelete({ variables: { _id: Number(id) }})

        if (response && response.data && response.data.deleteCollection) {
            if (refetch) {
                refetch({ silent: true })
            }

            history.push(routes.collections.index)
        }
    }
}
