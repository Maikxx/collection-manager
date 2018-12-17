import './TableBody.scss'
import * as React from 'react'
import { BEM } from '../../../../../services/BEMService'
import { TableBody as MaterialTableBody } from '@material-ui/core'

interface Props {
    className?: string
}

export class TableBody extends React.Component<Props> {
    private bem = new BEM('TableBody')

    public render() {
        const { className, children } = this.props

        return (
            <MaterialTableBody className={this.bem.getClassName(className)}>
                {children}
            </MaterialTableBody>
        )
    }
}
