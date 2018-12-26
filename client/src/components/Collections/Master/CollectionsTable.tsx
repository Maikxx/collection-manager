import * as React from 'react'
import { Table } from '../../../components/Core/DataDisplay/Table/Table/Table'
import { TableHead } from '@material-ui/core'
import { TableRow } from '../../../components/Core/DataDisplay/Table/Table/TableRow'
import { TableCell } from '../../../components/Core/DataDisplay/Table/Table/TableCell'
import { TableBody } from '../../../components/Core/DataDisplay/Table/Table/TableBody'
import { TextLink } from '../../Core/Text/TextLink/TextLink'
import { routes } from '../../../views/routes'
import { CollectionType } from '../../../types/Collection'

interface Props {
    collections?: CollectionType[]
}

export class CollectionsTable extends React.Component<Props> {
    public render() {
        return (
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
                    {this.renderTableRows()}
                </TableBody>
            </Table>
        )
    }

    private renderTableRows = () => {
        const { collections } = this.props

        if (!collections || !collections.length) {
            return null
        }

        return collections.map(collection => (
            <TableRow key={collection._id}>
                <TableCell>
                    <TextLink to={routes.collections.detail.data(collection._id)}>
                        {collection.name}
                    </TextLink>
                </TableCell>
                <TableCell>
                    {collection.createdAt}
                </TableCell>
            </TableRow>
        ))
    }
}