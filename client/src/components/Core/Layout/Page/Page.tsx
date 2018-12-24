import './Page.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { List } from '../../DataDisplay/List/List'
import { Wrap } from '../Wrap/Wrap'
import { PageActions } from './PageActions'

interface Props {
    className?: string
    hasPageHeader?: boolean
    renderPageActions?: () => React.ReactElement<List>
}

export class Page extends React.Component<Props> {
    private bem = new BEM('Page', () => ({
        'has-page-header': this.props.hasPageHeader,
        'has-page-actions': !!this.props.renderPageActions,
    }))

    public render() {
        const { children, className, renderPageActions } = this.props

        return (
            <main className={this.bem.getClassName(className)}>
                {children}
                {renderPageActions && (
                    <PageActions>
                        <Wrap>
                            {renderPageActions()}
                        </Wrap>
                    </PageActions>
                )}
            </main>
        )
    }
}
