import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
import { routes } from '../../routes'
import { CollectionsDataView } from './Data/CollectionsDataView'
import { CollectionsEditView } from './Edit/CollectionsEditView'
import { RefetchFunction } from '../../../components/Collections/Queries/ListCollectionsQuery'

interface Props extends RouteComponentProps {
    className?: string
    refetch?: RefetchFunction
}

export class CollectionsDetailView extends React.Component<Props> {
    private bem = new BEM('CollectionsDetailView')

    public render() {
        const { className, refetch } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                <Switch>
                    <Route
                        path={routes.collections.detail.edit()}
                        render={routeProps => (
                            <CollectionsEditView
                                {...routeProps}
                                refetch={refetch}
                            />
                        )}
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
