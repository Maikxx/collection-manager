import './TableView.scss'
import * as React from 'react'
import { BEM } from '../../../../../services/BEMService'
import { Page } from '../../../Layout/Page/Page'

interface Props {
    className?: string
}

export class TableView extends React.Component<Props> {
    private bem = new BEM('TableView')

    public render() {
        const { className, children } = this.props

        return (
            <Page className={this.bem.getClassName(className)}>
                {children}
            </Page>
        )
    }
}
