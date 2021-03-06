import './Button.scss'

import React, { CSSProperties } from 'react'
import { NavLink } from 'react-router-dom'
import { BEM } from '../../../services/BEMService'
import { Loader } from '../Feedback/Loader/Loader'

interface Props {
    className?: string
    disabled?: boolean
    external?: boolean
    form?: string
    ghost?: boolean
    href?: string
    loading?: boolean
    onClick?: () => void
    onMouseOut?: () => void
    onMouseOver?: () => void
    style?: CSSProperties
    submit?: boolean
    to?: string
    type?: ButtonType
}

export enum ButtonType {
    action = 'action',
    cancel = 'cancel',
    confirm = 'confirm',
    danger = 'danger',
    icon = 'icon',
    link = 'link',
    secondary = 'secondary',
    tertiary = 'tertiary',
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
