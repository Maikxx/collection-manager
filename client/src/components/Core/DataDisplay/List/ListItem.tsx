import './ListItem.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
    right?: boolean
}

export class ListItem extends React.PureComponent<Props> {
    private bem = new BEM('ListItem', () => ({
        right: this.props.right,
    }))

    public render() {
        const { children, className } = this.props

        return (
            <li className={this.bem.getClassName(className)}>
                {children}
            </li>
        )
    }
}
