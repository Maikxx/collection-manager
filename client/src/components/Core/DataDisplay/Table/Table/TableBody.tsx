import './TableBody.scss'
import * as React from 'react'
import { BEM } from '../../../../../services/BEMService'
import { TableBody as MaterialTableBody } from '@material-ui/core'
import { TableBodyProps } from '@material-ui/core/TableBody'

interface Props extends TableBodyProps {
    className?: string
}

export class TableBody extends React.Component<Props> {
    private bem = new BEM('TableBody')

    public render() {
        const { className, children, ...restProps } = this.props

        return (
            <MaterialTableBody
                className={this.bem.getClassName(className)}
                {...restProps}
            >
                {children}
            </MaterialTableBody>
        )
    }
}
