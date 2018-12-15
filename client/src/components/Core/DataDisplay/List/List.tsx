import './List.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
    horizontal?: boolean
    stretch?: boolean
}

export class List extends React.PureComponent<Props> {
    private bem = new BEM('List', () => ({
        horizontal: this.props.horizontal,
        stretch: this.props.stretch,
    }))

    public render() {
        const { className, children } = this.props

        return (
            <ul className={this.bem.getClassName(className)}>
                {children}
            </ul>
        )
    }
}
