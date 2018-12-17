import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { RouteComponentProps } from 'react-router-dom'
import { Page } from '../../../../components/Core/Layout/Page/Page'
import { Wrap } from '../../../../components/Core/Layout/Wrap/Wrap'

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

        return (
            <Page className={this.bem.getClassName(className)}>
                <Wrap>
                    Detail page for {id}
                </Wrap>
            </Page>
        )
    }
}
