import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Switch, Route, Redirect } from 'react-router-dom'
import { routes } from '../../routes'
import { CollectionsDataView } from './Data/CollectionsDataView'

interface Props {
    className?: string
}

export class CollectionsDetailViewx extends React.Component<Props> {
    private bem = new BEM('CollectionsDetailViewx')

    public render() {
        const { className } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                <Switch>
                    <Route
                        path={routes.collections.detail.data()}
                        exact={true}
                        component={CollectionsDataView}
                    />
                    <Redirect
                        from={routes.collections.detail.index}
                        exact={true}
                        to={routes.collections.detail.data()}
                    />
                </Switch>
            </div>
        )
    }
}
