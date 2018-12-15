import * as React from 'react'
import { Page } from '../../components/Core/Layout/Page/Page'
import { BEM } from '../../services/BEMService'
import { ListCollectionsQuery } from '../../components/Collections/Queries/ListCollectionsQuery'
import { PageHeader } from '../../components/Chrome/PageHeader/PageHeader'
import { ActionBar } from '../../components/Chrome/ActionBar/ActionBar'
import { Wrap } from '../../components/Core/Layout/Wrap/Wrap'
import { List } from '../../components/Core/DataDisplay/List/List'
import { ListItem } from '../../components/Core/DataDisplay/List/ListItem'
import { Button, ButtonType } from '../../components/Core/Button/Button'

interface Props {}

export class CollectionsView extends React.Component<Props> {
    private bem = new BEM('CollectionsView')

    public render() {
        return (
            <ListCollectionsQuery>
                <Page className={this.bem.getClassName()}>
                    <PageHeader />
                    <Wrap>
                        {this.renderActionBar()}
                    </Wrap>
                </Page>
            </ListCollectionsQuery>
        )
    }

    private renderActionBar = () => {
        return (
            <ActionBar>
                <List horizontal={true}>
                    <ListItem right={true}>
                        <Button type={ButtonType.action}>
                            Add collection
                        </Button>
                    </ListItem>
                </List>
            </ActionBar>
        )
    }
}