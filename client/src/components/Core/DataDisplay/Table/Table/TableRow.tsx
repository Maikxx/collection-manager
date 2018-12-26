import './TableRow.scss'
import * as React from 'react'
import { BEM } from '../../../../../services/BEMService'
import { TableRow as MaterialTableRow } from '@material-ui/core'
import { TableRowProps } from '@material-ui/core/TableRow'

interface Props extends TableRowProps {
    className?: string
}

export class TableRow extends React.Component<Props> {
    private bem = new BEM('TableRow')

    public render() {
        const { className, children, ...restProps } = this.props

        return (
            <MaterialTableRow
                className={this.bem.getClassName(className)}
                {...restProps}
            >
                {children}
            </MaterialTableRow>
        )
    }
}
