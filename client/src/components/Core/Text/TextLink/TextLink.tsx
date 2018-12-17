import './TextLink.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { Link, LinkProps } from 'react-router-dom'

interface Props extends LinkProps {
    className?: string

}

export class TextLink extends React.Component<Props> {
    private bem = new BEM('TextLink')

    public render() {
        const { className, children, ...restProps } = this.props

        return (
            <Link
                className={this.bem.getClassName(className)}
                {...restProps}
            >
                {children}
            </Link>
        )
    }
}
