import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { RouteComponentProps } from 'react-router-dom'
import { Page } from '../../../../components/Core/Layout/Page/Page'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { FieldCollection } from '../../../../components/Core/Field/FieldCollection/FieldCollection'
import { Loader } from '../../../../components/Core/Feedback/Loader/Loader'
import { routes } from '../../../routes'
import { DeleteCollectionMutationFunction } from '../../../../components/Collections/Apollo/DeleteCollectionMutation'
import { ListCollectionsRefetchFunction } from '../../../../components/Collections/Apollo/ListCollectionsQuery'
import { GetCollectionQuery, GetCollectionMutationContent } from '../../../../components/Collections/Apollo/GetCollectionQuery'
import {
    EditCollectionMutation,
    EditCollectionMutationContent,
    EditCollectionMutationFunction
} from '../../../../components/Collections/Apollo/EditCollectionMutation'
import { Form, getFieldsFromSubmitEvent } from '../../../../components/Core/DataEntry/Form/Form'
import { EditViewPageActions } from '../../../../components/Collections/Edit/EditViewPageActions'
import { EditViewGeneralFieldGroup } from '../../../../components/Collections/Edit/EditViewGeneralFieldGroup'
import { EditViewHeader } from '../../../../components/Collections/Edit/EditViewHeader'

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
                    <GetCollectionQuery variables={{ byId: id }}>
                        {({ data, loading }: GetCollectionMutationContent) => {
                            if (loading) {
                                return <Loader />
                            }

                            if (!data) {
                                return 'No collection could be found'
                            }

                            const { getCollection: collection } = data
                            const name = collection && collection.name

                            return (
                                <React.Fragment>
                                    <EditViewHeader
                                        loading={loading}
                                        name={name}
                                        routeTo={routes.collections.index}
                                    />
                                    <Wrap>
                                        <FieldCollection>
                                            <EditViewGeneralFieldGroup collection={collection}/>
                                        </FieldCollection>
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
            <EditViewPageActions
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
                        _id: id,
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

        const response = await mutateDelete({ variables: { _id: id }})

        if (response && response.data && response.data.deleteCollection) {
            if (refetch) {
                refetch({ silent: true })
            }

            history.push(routes.collections.index)
        }
    }
}
