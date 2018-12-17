import * as React from 'react'
import { TableHead as MaterialTableHead } from '@material-ui/core'

interface Props {
    className?: string
}

export class TableHead extends React.Component<Props> {
    public render() {
        const { children } = this.props

        return (
            <MaterialTableHead>
                {children}
            </MaterialTableHead>
        )
    }
}
