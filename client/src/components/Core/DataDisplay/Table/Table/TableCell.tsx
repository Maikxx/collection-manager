import './TableCell.scss'
import * as React from 'react'
import { BEM } from '../../../../../services/BEMService'
import { TableCell as MaterialTableCell } from '@material-ui/core'

interface Props {
    className?: string
}

export class TableCell extends React.Component<Props> {
    private bem = new BEM('TableCell')

    public render() {
        const { className, children } = this.props

        return (
            <MaterialTableCell className={this.bem.getClassName(className)}>
                {children}
            </MaterialTableCell>
        )
    }
}
