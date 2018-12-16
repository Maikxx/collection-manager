import './FieldCollection.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
}

export class FieldCollection extends React.Component<Props> {
    private bem = new BEM('FieldCollection')

    public render() {
        const { className, children } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                {children}
            </div>
        )
    }
}
