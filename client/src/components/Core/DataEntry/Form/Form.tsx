import './Form.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'

type FormAutoCapitalizeType = 'none' | 'sentences' | 'words' | 'characters'
type FormAutoCompleteType = 'off' | 'on'
type FormEncTypeType = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
type FormMethodType = 'post' | 'get' | 'dialog'
type FormTarget = '_self' | '_blank' | '_parent' | '_top' | string

export const getFieldsFromSubmitEvent = (event: React.FormEvent<HTMLFormElement>) => {
    return Array.prototype.slice.call(event.target)
        .filter((el: HTMLInputElement | HTMLTextAreaElement) => el.name)
        .reduce((form: any, el: HTMLInputElement | HTMLTextAreaElement) => ({
            ...form,
            [el.name]: el.value.trim(),
        }), {})
}

interface Props {
    acceptCharset?: string
    action?: string
    autoCapitalize?: FormAutoCapitalizeType
    autocomplete?: FormAutoCompleteType
    className?: string
    encType?: FormEncTypeType
    id?: string
    method?: FormMethodType
    name?: string
    noValidate?: boolean
    onChange?: React.ChangeEventHandler<HTMLFormElement>
    onSubmit?: React.FormEventHandler<HTMLFormElement>
    shouldPreventDefault?: boolean
    target?: FormTarget
}

export class Form extends React.Component<Props> {
    public static defaultProps = {
        shouldPreventDefault: true,
    }

    private bem = new BEM('Form')

    public render() {
        const {
            children,
            className,
            onSubmit,
            shouldPreventDefault,
            // tslint:disable-next-line:trailing-comma
            ...restProps
        } = this.props

        return (
            <form
                className={this.bem.getClassName(className)}
                onSubmit={this.onSubmit}
                {...restProps}
            >
                {children}
            </form>
        )
    }

    private onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
        const { shouldPreventDefault, onSubmit } = this.props

        if (shouldPreventDefault) {
            event.preventDefault()
        }

        if (onSubmit) {
            onSubmit(event)
        }
    }
}
