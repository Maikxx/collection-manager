import './TableHead.scss'
import * as React from 'react'
import { BEM } from '../../../../../services/BEMService'
import { TableHead as MaterialTableHead } from '@material-ui/core'

interface Props {
    className?: string
}

export class TableHead extends React.Component<Props> {
    private bem = new BEM('TableHead')

    public render() {
        const { className, children } = this.props

        return (
            <MaterialTableHead className={this.bem.getClassName(className)}>
                {children}
            </MaterialTableHead>
        )
    }
}
