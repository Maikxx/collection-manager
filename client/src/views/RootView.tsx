import * as React from 'react'
import { BEM } from '../services/BEMService'
import { CollectionsView } from './Collections/CollectionsView'
import { Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom'
import { routes } from './routes'
import { PageHeader } from '../components/Chrome/PageHeader/PageHeader'

interface Props extends RouteComponentProps {}

export class RootView extends React.Component<Props> {
    private bem = new BEM('RootView')

    public render() {
        return (
            <main className={this.bem.getClassName()}>
                <PageHeader />
                <Switch>
                    <Route
                        path={routes.collections.index}
                        component={CollectionsView}
                    />
                    <Redirect
                        from={routes.index}
                        exact={true}
                        to={routes.collections.index}
                    />
                </Switch>
            </main>
        )
    }
}
