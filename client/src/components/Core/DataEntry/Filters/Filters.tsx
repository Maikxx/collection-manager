import * as React from 'react'
import { Accordion } from '../../Feedback/Accordion/Accordion'
import { BEM } from '../../../../services/BEMService'

interface Props {
    className?: string
}

export class Filters extends React.Component<Props> {
    private bem = new BEM('Filters')

    public render() {
        const { children, className } = this.props

        return (
            <Accordion
                buttonText={`Filters`}
                className={this.bem.getClassName(className)}
            >
                {children}
            </Accordion>
        )
    }
}
