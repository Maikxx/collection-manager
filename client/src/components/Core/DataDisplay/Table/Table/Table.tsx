import './Table.scss'
import * as React from 'react'
import { BEM } from '../../../../../services/BEMService'
import { Table as MaterialTable, Paper } from '@material-ui/core'
import { TableProps } from '@material-ui/core/Table'

interface Props extends TableProps {
    className?: string
}

export class Table extends React.Component<Props> {
    private bem = new BEM('Table')

    public render() {
        const { className, children, ...restProps } = this.props

        return (
            <Paper className={this.bem.getClassName(className)}>
                <MaterialTable
                    className={this.bem.getElement('table')}
                    {...restProps}
                >
                    {children}
                </MaterialTable>
            </Paper>
        )
    }
}
