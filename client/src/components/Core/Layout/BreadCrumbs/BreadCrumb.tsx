import './BreadCrumb.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { ListItem } from '../../DataDisplay/List/ListItem'
import { Loader } from '../../Feedback/Loader/Loader'

interface Props {
    className?: string
    isLoading?: boolean
}

export class BreadCrumb extends React.Component<Props> {
    private bem = new BEM('BreadCrumb', () => ({
        'is-loading': this.props.isLoading,
    }))

    public render() {
        const { children, className, isLoading } = this.props

        return (
            <ListItem className={this.bem.getClassName(className)}>
                {!isLoading && children}
                {isLoading && (
                    <Loader />
                )}
            </ListItem>
        )
    }
}
