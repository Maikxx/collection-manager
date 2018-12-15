import './PageHeader.scss'
import * as React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'
import { Search } from '../../Core/DataEntry/Search/Search'
import { BEM } from '../../../services/BEMService'

interface Props {
    className?: string
    onSearch: (searchText?: string) => void
}

export class PageHeader extends React.Component<Props> {
    private bem = new BEM('PageHeader')

    public render() {
        const { className, onSearch } = this.props

        return (
            <AppBar
                className={this.bem.getClassName(className)}
                position={`fixed`}
            >
                <Typography
                    className={this.bem.getElement('title')}
                    component={`h1`}
                    variant={`h4`}
                >
                    Collection manager
                </Typography>
                <Search onSearch={onSearch}/>
            </AppBar>
        )
    }
}
