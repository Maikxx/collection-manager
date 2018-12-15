import * as React from 'react'
import { Page } from '../components/Layout/Page/Page'
import { BEM } from '../services/BEMService'

interface Props {}

export class RootView extends React.Component<Props> {
    private bem = new BEM('RootView')

    public render() {
        return (
            <Page className={this.bem.getClassName()}>
                Hoi
            </Page>
        )
    }
}
