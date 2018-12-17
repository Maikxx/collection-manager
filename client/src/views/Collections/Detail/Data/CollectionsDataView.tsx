import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { RouteComponentProps } from 'react-router-dom'

interface RouteParams {
    id: string
}

interface Props extends RouteComponentProps<RouteParams> {
    className?: string
}

export class CollectionsDataView extends React.Component<Props> {
    private bem = new BEM('CollectionsDataView')

    public render() {
        const { className } = this.props
        const { id } = this.props.match.params
        console.log(id)

        return (
            <div className={this.bem.getClassName(className)}>
                Dit is de detail page
            </div>
        )
    }
}
