import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { RouteComponentProps } from 'react-router-dom'
import { Page } from '../../../../components/Core/Layout/Page/Page'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { Header } from '../../../../components/Core/Layout/Header/Header'
import { BreadCrumbs } from '../../../../components/Core/Layout/BreadCrumbs/BreadCrumbs'
import { BreadCrumb } from '../../../../components/Core/Layout/BreadCrumbs/BreadCrumb'
import { MutationFunc } from 'react-apollo'
import { FieldCollection } from '../../../../components/Core/Field/FieldCollection/FieldCollection'
import { FieldGroup } from '../../../../components/Core/Field/FieldGroup/FieldGroup'
import { Field } from '../../../../components/Core/Field/Field/Field'
import { Loader } from '../../../../components/Core/Feedback/Loader/Loader'
import { TextLink } from '../../../../components/Core/Text/TextLink/TextLink'
import { routes } from '../../../routes'
import { List } from '../../../../components/Core/DataDisplay/List/List'
import { ListItem } from '../../../../components/Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../../../components/Core/Button/Button'
import { Input } from '../../../../components/Core/DataEntry/Input/Input'
import { RefetchFunction, QueryContent, MutationContent } from '../../../../types/Apollo'
import {
    DeleteCollectionMutation,
    DeleteCollectionMutationResponse,
} from '../../../../components/Collections/Apollo/DeleteCollectionMutation'
import { ListCollectionsQueryResponse } from '../../../../components/Collections/Apollo/ListCollectionsQuery'
import { GetCollectionQuery, GetCollectionQueryResponse } from '../../../../components/Collections/Apollo/GetCollectionQuery'
import {
    EditCollectionMutation,
    EditCollectionMutationResponse,
    EditCollectionMutationVariables
} from '../../../../components/Collections/Apollo/EditCollectionMutation'
import { Form, getFieldsFromSubmitEvent } from '../../../../components/Core/DataEntry/Form/Form'

interface Props extends RouteComponentProps<{ id: string }> {
    className?: string
    refetch?: RefetchFunction<ListCollectionsQueryResponse>
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

    private renderForm = (
        mutate: MutationFunc<EditCollectionMutationResponse, EditCollectionMutationVariables>,
        { loading }: MutationContent<EditCollectionMutationResponse>
    ) => {
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
                        {this.renderQueryContent}
                    </GetCollectionQuery>
                </Page>
            </Form>
        )
    }

    private renderQueryContent = ({ data, loading }: QueryContent<GetCollectionQueryResponse>) => {
        if (loading) {
            return <Loader />
        }

        if (!data) {
            return 'No collection could be found'
        }

        const { getCollection } = data
        const name = getCollection && getCollection.name
        const createdAt = getCollection && getCollection.createdAt

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
                    <FieldCollection>
                        <FieldGroup title={`General`}>
                            <Field title={`Name`}>
                                <Input
                                    name={`name`}
                                    type={`text`}
                                    defaultValue={name}
                                />
                            </Field>
                            <Field title={`Created at`}>
                                <Input
                                    name={`createdAt`}
                                    type={`date`}
                                    defaultValue={createdAt}
                                    disabled={true}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldCollection>
                </Wrap>
            </React.Fragment>
        )
    }

    private renderPageActions = (loading: boolean) => {
        const { history } = this.props
        const { id } = this.props.match.params

        return (
            <List horizontal={true}>
                <ListItem>
                    <DeleteCollectionMutation>
                        {this.renderDeleteButton}
                    </DeleteCollectionMutation>
                </ListItem>
                <ListItem right={true}>
                    <Button
                        onClick={() => history.push(routes.collections.detail.data(id))}
                        type={ButtonType.cancel}
                    >
                        Cancel
                    </Button>
                </ListItem>
                <ListItem right={true}>
                    <Button
                        form={`editCollectionForm`}
                        loading={loading}
                        type={ButtonType.confirm}
                    >
                        Save
                    </Button>
                </ListItem>
            </List>
        )
    }

    private renderDeleteButton = (mutate: MutationFunc, { loading }: MutationContent<DeleteCollectionMutationResponse>) => {
        return (
            <Button
                loading={loading}
                onClick={() => this.onDelete(mutate)}
                type={ButtonType.danger}
            >
                Delete
            </Button>
        )
    }

    private onSubmit = (mutateEdit: MutationFunc<EditCollectionMutationResponse>) =>
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

    private onDelete = async (mutateDelete: MutationFunc<DeleteCollectionMutationResponse>) => {
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
