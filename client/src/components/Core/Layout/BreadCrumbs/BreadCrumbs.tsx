import './BreadCrumbs.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { List } from '../../DataDisplay/List/List'

interface Props {
    className?: string
}

export class BreadCrumbs extends React.Component<Props> {
    private bem = new BEM('BreadCrumbs')

    public render() {
        const { className, children } = this.props

        return (
            <nav className={this.bem.getClassName(className)}>
                <List horizontal={true}>
                    {children}
                </List>
            </nav>
        )
    }
}
