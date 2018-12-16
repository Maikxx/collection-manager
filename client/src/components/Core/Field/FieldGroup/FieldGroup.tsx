import './FieldGroup.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { Row } from '../../Layout/Row/Row'

interface Props {
    className?: string
    title: string
}

export class FieldGroup extends React.Component<Props> {
    private bem = new BEM('FieldGroup')

    public render() {
        const { className, children, title } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                <Row>
                    <h3 className={this.bem.getElement('title')}>
                        {title}
                    </h3>
                    <div className={this.bem.getElement('content')}>
                        {children}
                    </div>
                </Row>
            </div>
        )
    }
}
