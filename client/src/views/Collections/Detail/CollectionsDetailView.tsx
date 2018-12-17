import * as React from 'react'
import { BEM } from '../../../services/BEMService'
import { Switch, Route } from 'react-router-dom'
import { routes } from '../../routes'
import { CollectionsDataView } from './Data/CollectionsDataView'
import { Header } from '../../../components/Core/Layout/Header/Header'
import { BreadCrumbs } from '../../../components/Core/Layout/BreadCrumbs/BreadCrumbs'
import { BreadCrumb } from '../../../components/Core/Layout/BreadCrumbs/BreadCrumb'

interface Props {
    className?: string
}

export class CollectionsDetailView extends React.Component<Props> {
    private bem = new BEM('CollectionsDetailView')

    public render() {
        const { className } = this.props

        return (
            <div className={this.bem.getClassName(className)}>
                <Header>
                    <BreadCrumbs>
                        <BreadCrumb>
                            Collections
                        </BreadCrumb>
                    </BreadCrumbs>
                </Header>
                <Switch>
                    <Route
                        path={routes.collections.detail.data()}
                        component={CollectionsDataView}
                    />
                </Switch>
            </div>
        )
    }
}
