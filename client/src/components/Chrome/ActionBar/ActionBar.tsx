import './ActionBar.scss'
import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Row } from '../../Core/Layout/Row/Row'

interface Props {
    className?: string
    fullWidth?: boolean
}

export class ActionBar extends React.Component<Props> {
    private bem = new BEM('ActionBar', () => ({
        'full-width': this.props.fullWidth,
    }))

    public render() {
        const { children, className } = this.props

        return (
            <Row className={this.bem.getClassName(className)}>
                {children}
            </Row>
        )
    }
}
