import './Button.scss'

import React, { CSSProperties } from 'react'
// import { IconType } from '~/components/Core/Icon/IconType'
// import { Icon } from '~/components/Core/Icon/Icon'
import { NavLink } from 'react-router-dom'
import { BEM } from '../../../services/BEMService'
import { Loader } from '../Feedback/Loader/Loader'

interface Props {
    className?: string
    type?: ButtonType
    // icon?: IconType
    disabled?: boolean
    loading?: boolean
    ghost?: boolean
    onClick?: () => void
    to?: string
    href?: string
    external?: boolean
    submit?: boolean
    form?: string
    style?: CSSProperties
    onMouseOver?: () => void
    onMouseOut?: () => void
}

export enum ButtonType {
    danger = 'danger',
    confirm = 'confirm',
    secondary = 'secondary',
    tertiary = 'tertiary',
    cancel = 'cancel',
    icon = 'icon',
    link = 'link',
    action = 'action',
}

interface Modifiers {
    clicked: boolean
    disabled: boolean
    ghost: boolean
    loading: boolean
}

export class Button extends React.Component<Props> {
    private button = React.createRef<any>()

    private bem = new BEM<Modifiers>('Button', () => ({
        [`is-${this.props.type}`]: !!this.props.type,
        'is-disabled': this.props.disabled,
        'is-loading': this.props.loading,
        'is-icon-button': !this.props.children,
    }))

    public render() {
        const {
            to,
            href,
            disabled,
        } = this.props

        // Anchor tags cannot be "disabled". So if disabled is true and the component is a link
        // render a disabled button
        if ((to || href) && disabled) {
            return this.renderButton()
        }

        if (to) {
            return this.renderNavLink()
        }

        if (href) {
            return this.renderLink()
        }

        return this.renderButton()
    }

    public focus() {
        if (!this.button.current) {
            return
        }

        this.button.current.focus()
    }

    private renderButton() {
        const {
            children,
            className,
            disabled,
            form,
            // icon,
            loading,
            style,
            submit,
        } = this.props

        const buttonType = submit
            ? 'submit'
            : form
                ? 'submit'
                : 'button'

        return (
            <button
                type={buttonType}
                className={this.bem.getClassName(className)}
                disabled={disabled ? disabled : loading}
                onClick={this.handleOnClick}
                ref={this.button}
                form={form}
                style={style}
                onMouseOver={this.handleOnMouseOver}
                onMouseOut={this.handleOnMouseOut}
            >
                <span className={this.bem.getElement('inner')}>
                    {/* {icon && (
                        <Icon type={icon} className={this.bem.getElement('icon')} />
                    )} */}
                    {children}
                </span>
                {loading && (
                    <Loader className={this.bem.getElement('spinner')} />
                )}
            </button>
        )
    }

    private renderNavLink() {
        const {
            children,
            className,
            external,
            loading,
            // icon,
            style,
            to,
        } = this.props

        if (!to) {
            return
        }

        return (
            <NavLink
                className={this.bem.getClassName(className)}
                to={to}
                onClick={this.handleOnClick}
                target={external ? '_blank' : undefined}
                style={style}
            >
                <span className={this.bem.getElement('inner')}>
                    {/* {icon && (
                        <Icon type={icon} className={this.bem.getElement('icon')} />
                    )} */}
                    <span className={this.bem.getElement('label')}>
                        {children}
                    </span>
                </span>
                {loading && (
                    <Loader className={this.bem.getElement('spinner')} />
                )}
            </NavLink>
        )
    }

    private renderLink() {
        const {
            children,
            className,
            external,
            href,
            loading,
            // icon,
        } = this.props

        if (!href) {
            return
        }

        return (
            <a
                className={this.bem.getClassName(className)}
                href={href}
                onClick={this.handleOnClick}
                ref={this.button}
                target={external ? '_blank' : undefined}
            >
                <span className={this.bem.getElement('inner')}>
                    {/* {icon && (
                        <Icon type={icon} className={this.bem.getElement('icon')} />
                    )} */}
                    <span className={this.bem.getElement('label')}>
                        {children}
                    </span>
                </span>
                {loading && (
                    <Loader className={this.bem.getElement('spinner')} />
                )}
            </a>
        )
    }

    private handleOnClick = () => {
        const { onClick, disabled } = this.props

        if (disabled) {
            return
        }

        if (onClick) {
            onClick()
        }
    }

    private handleOnMouseOver = () => {
        const { onMouseOver, disabled } = this.props

        if (disabled) {
            return
        }

        if (onMouseOver) {
            onMouseOver()
        }
    }

    private handleOnMouseOut = () => {
        const { onMouseOut, disabled } = this.props

        if (disabled) {
            return
        }

        if (onMouseOut) {
            onMouseOut()
        }
    }
}
