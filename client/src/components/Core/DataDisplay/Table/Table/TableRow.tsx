import './TableRow.scss'
import * as React from 'react'
import { BEM } from '../../../../../services/BEMService'
import { TableRow as MaterialTableRow } from '@material-ui/core'

interface Props {
    className?: string
}

export class TableRow extends React.Component<Props> {
    private bem = new BEM('TableRow')

    public render() {
        const { className, children } = this.props

        return (
            <MaterialTableRow className={this.bem.getClassName(className)}>
                {children}
            </MaterialTableRow>
        )
    }
}
