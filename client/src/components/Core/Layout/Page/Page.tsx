import './Page.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
    hasPageHeader?: boolean
}

export class Page extends React.Component<Props> {
    private bem = new BEM('Page', () => ({
        'cm-Page--has-page-header': this.props.hasPageHeader,
    }))

    public render() {
        const { children, className } = this.props

        return (
            <main className={this.bem.getClassName(className)}>
                {children}
            </main>
        )
    }
}
