import './Header.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
}

export class Header extends React.Component<Props> {
    private bem = new BEM('Header')

    public render() {
        const { children, className } = this.props

        return (
            <header className={this.bem.getClassName(className)}>
                {children}
            </header>
        )
    }
}
