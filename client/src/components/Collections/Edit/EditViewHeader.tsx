import * as React from 'react'
import { Header } from '../../Core/Layout/Header/Header'
import { BreadCrumbs } from '../../Core/Layout/BreadCrumbs/BreadCrumbs'
import { BreadCrumb } from '../../Core/Layout/BreadCrumbs/BreadCrumb'
import { TextLink } from '../../Core/Text/TextLink/TextLink'

interface Props {
    loading?: boolean
    name?: string
    routeTo: string
}

export class EditViewHeader extends React.Component<Props> {
    public render() {
        const { loading, name, routeTo } = this.props

        return (
            <Header>
                <BreadCrumbs>
                    <BreadCrumb>
                        <TextLink to={routeTo}>
                            Collections
                        </TextLink>
                    </BreadCrumb>
                    <BreadCrumb isLoading={loading}>
                        {name}
                    </BreadCrumb>
                </BreadCrumbs>
            </Header>
        )
    }
}
