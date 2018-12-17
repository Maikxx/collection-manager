import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { RouteComponentProps } from 'react-router-dom'
import { Page } from '../../../../components/Core/Layout/Page/Page'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'
import { Header } from '../../../../components/Core/Layout/Header/Header'
import { BreadCrumbs } from '../../../../components/Core/Layout/BreadCrumbs/BreadCrumbs'
import { BreadCrumb } from '../../../../components/Core/Layout/BreadCrumbs/BreadCrumb'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { FieldCollection } from '../../../../components/Core/Field/FieldCollection/FieldCollection'
import { FieldGroup } from '../../../../components/Core/Field/FieldGroup/FieldGroup'
import { Field } from '../../../../components/Core/Field/Field/Field'
import { Loader } from '../../../../components/Core/Feedback/Loader/Loader'
import { TextLink } from '../../../../components/Core/Text/TextLink/TextLink'
import { routes } from '../../../routes'
import { List } from '../../../../components/Core/DataDisplay/List/List'
import { ListItem } from '../../../../components/Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../../../components/Core/Button/Button'

const GET_COLLECTION_QUERY = gql`
    query($byId: MongoID) {
        getCollection(byId: $byId) {
            _id
            name
            createdAt
        }
    }
`
interface QueryVariables {
    byId: string
}

interface QueryResponse {
    getCollection?: {
        _id: string
        name: string
        createdAt?: Date
    }
}

interface RouteParams {
    id: string
}

interface Props extends RouteComponentProps<RouteParams> {
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
                <Query<QueryResponse, QueryVariables>
                    query={GET_COLLECTION_QUERY}
                    variables={{ byId: id }}
                >
                    {({ data, loading }) => {
                        if (loading) {
                            return (
                                <Loader />
                            )
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
                                                {name}
                                            </Field>
                                            <Field title={`Created at`}>
                                                {createdAt}
                                            </Field>
                                        </FieldGroup>
                                    </FieldCollection>
                                </Wrap>
                            </React.Fragment>
                        )
                    }}
                </Query>
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
