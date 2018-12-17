import './Loader.scss'
import * as React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
}

export class Loader extends React.PureComponent<Props> {
    private bem = new BEM('Loader')

    public render() {
        const { className } = this.props

        return (
            <CircularProgress className={this.bem.getClassName(className)}/>
        )
    }
}
