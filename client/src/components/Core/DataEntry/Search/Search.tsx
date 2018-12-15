import './Search.scss'
import * as React from 'react'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
    onSearch: (searchText?: string) => void
}

export class Search extends React.Component<Props> {
    private bem = new BEM('Search')

    public render() {
        const { className } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                <div className={this.bem.getElement('search-icon')}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder={`Search for a plane`}
                    classes={{
                        input: this.bem.getElement('input-input'),
                        root: this.bem.getElement('input-root'),
                    }}
                    onKeyUp={this.onInputChange}
                />
            </div>
        )
    }

    private onInputChange = (event: React.KeyboardEvent) => {
        const { onSearch } = this.props
        const target = event.target as HTMLInputElement
        const { value } = target

        onSearch(value)
    }
}
