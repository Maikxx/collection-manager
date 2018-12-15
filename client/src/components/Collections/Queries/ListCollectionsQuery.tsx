import * as React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

const LIST_COLLECTIONS_QUERY = gql`
    query {
        listCollections {
            name
        }
    }
`

interface Props {
    children: any
}

export class ListCollectionsQuery extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <Query query={LIST_COLLECTIONS_QUERY}>
                {({ loading, error, data }) => React.cloneElement(children, { loading, error, data })}
            </Query>
        )
    }
}
