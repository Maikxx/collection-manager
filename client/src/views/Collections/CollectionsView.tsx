import * as React from 'react'
import { Page } from '../../components/Layout/Page/Page'
import { BEM } from '../../services/BEMService'
import { ListCollectionsQuery } from '../../components/Collections/Queries/ListCollectionsQuery'

interface Props {}

export class CollectionsView extends React.Component<Props> {
    private bem = new BEM('CollectionsView')

    public render() {
        return (
            <ListCollectionsQuery>
                <Page className={this.bem.getClassName()}>
                    Hoi
                </Page>
            </ListCollectionsQuery>
        )
    }
}
