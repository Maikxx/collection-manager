import './Input.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { TextField } from '@material-ui/core'

interface Props {
    className?: string
    defaultValue?: string | number | any
    disabled?: boolean
    name: string
    required?: boolean
    type: string
}

export class Input extends React.Component<Props> {
    private bem = new BEM('Input')

    public render() {
        const { className, ...restProps } = this.props

        return (
            <TextField
                className={this.bem.getClassName(className)}
                variant={`outlined`}
                {...restProps}
            />
        )
    }
}
