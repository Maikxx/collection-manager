import * as React from 'react'
import { BEM } from '../../services/BEMService'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
import { CollectionsMasterView } from './Master/CollectionsMasterView'
import { routes } from '../routes'
import { CollectionsDetailView } from './Detail/CollectionsDetailView'
import { ListCollectionsRefetchFunction } from '../../components/Collections/Apollo/ListCollectionsQuery'

interface Props extends RouteComponentProps {}

export class CollectionsView extends React.Component<Props> {
    private bem = new BEM('CollectionsView')
    private refetchFunction: ListCollectionsRefetchFunction

    public render() {
        return (
            <div className={this.bem.getClassName()}>
                <Switch>
                    <Route
                        path={routes.collections.index}
                        exact={true}
                        render={routeProps => (
                            <CollectionsMasterView
                                {...routeProps}
                                onQueryLoaded={refetchFunction => this.refetchFunction = refetchFunction}
                            />
                        )}
                    />
                    <Route
                        path={routes.collections.detail.index}
                        render={routeProps => (
                            <CollectionsDetailView
                                {...routeProps}
                                refetch={this.refetchFunction}
                            />
                        )}
                    />
                </Switch>
            </div>
        )
    }
}
