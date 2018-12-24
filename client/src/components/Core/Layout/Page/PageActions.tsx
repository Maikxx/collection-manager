import './PageActions.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { Wrap } from '../Wrap/Wrap'

interface Props {
    children: React.ReactElement<Wrap>
    className?: string
}

export class PageActions extends React.Component<Props> {
    private bem = new BEM('PageActions')

    public render() {
        const { children, className } = this.props

        return (
            <footer className={this.bem.getClassName(className)}>
                {children}
            </footer>
        )
    }
}
