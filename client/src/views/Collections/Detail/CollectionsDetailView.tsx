import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
import { routes } from '../../routes'
import { CollectionsDataView } from './Data/CollectionsDataView'
import { CollectionsEditView } from './Edit/CollectionsEditView'

interface Props extends RouteComponentProps {
    className?: string
}

export class CollectionsDetailView extends React.Component<Props> {
    private bem = new BEM('CollectionsDetailView')

    public render() {
        const { className } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                <Switch>
                    <Route
                        path={routes.collections.detail.edit()}
                        component={CollectionsEditView}
                    />
                    <Route
                        path={routes.collections.detail.data()}
                        component={CollectionsDataView}
                    />
                </Switch>
            </div>
        )
    }
}
