import * as React from 'react'
import { BEM } from '../../services/BEMService'
import { Switch, Route } from 'react-router-dom'
import { CollectionsMasterView } from './Master/CollectionsMasterView'
import { routes } from '../routes'

interface Props {}

export class CollectionsView extends React.Component<Props> {
    private bem = new BEM('CollectionsView')

    public render() {
        return (
            <div className={this.bem.getClassName()}>
                <Switch>
                    <Route
                        path={routes.collections.index}
                        exact={true}
                        component={CollectionsMasterView}
                    />
                </Switch>
            </div>
        )
    }
}
