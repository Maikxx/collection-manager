import './Table.scss'
import * as React from 'react'
import { BEM } from '../../../../../services/BEMService'
import { Table as MaterialTable, Paper } from '@material-ui/core'

interface Props {
    className?: string
}

export class Table extends React.Component<Props> {
    private bem = new BEM('Table')

    public render() {
        const { className, children } = this.props

        return (
            <Paper className={this.bem.getClassName(className)}>
                <MaterialTable className={this.bem.getElement('table')}>
                    {children}
                </MaterialTable>
            </Paper>
        )
    }
}
