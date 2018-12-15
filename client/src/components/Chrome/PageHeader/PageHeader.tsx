import './PageHeader.scss'
import * as React from 'react'
import { Search } from '../../Core/DataEntry/Search/Search'
import { BEM } from '../../../services/BEMService'
import { Wrap } from '../../Core/Layout/Wrap/Wrap'

interface Props {
    className?: string
    onSearch?: (searchText?: string) => void
}

export class PageHeader extends React.Component<Props> {
    private bem = new BEM('PageHeader')

    public render() {
        const { className, onSearch } = this.props

        return (
            <header className={this.bem.getClassName(className)}>
                <Wrap>
                    <h1 className={this.bem.getElement('title')}>
                        Collection manager
                    </h1>
                    {onSearch && (
                        <Search onSearch={onSearch}/>
                    )}
                </Wrap>
            </header>
        )
    }
}
