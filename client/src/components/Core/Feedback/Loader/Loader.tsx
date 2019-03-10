import './Loader.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
}

export class Loader extends React.PureComponent<Props> {
    private bem = new BEM('Loader')

    public render() {
        const { className } = this.props

        return (
            <i className={this.bem.getClassName(className)}/>
        )
    }
}
