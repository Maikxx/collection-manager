import './Modal.scss'
import * as React from 'react'
import { BEM } from '../../../../services/BEMService'
import { Modal as MaterialModal, IconButton } from '@material-ui/core'
import { ModalProps } from '@material-ui/core/Modal'
import { Row } from '../../Layout/Row/Row'
import CloseButton from '@material-ui/icons/Close'

interface Props extends ModalProps {
    className?: string
    onClose: () => void
    title?: string
}

export class Modal extends React.Component<Props> {
    private bem = new BEM('Modal')

    public render() {
        const { className, onClose, children, open, title, ...restProps } = this.props

        return (
            <MaterialModal
                className={this.bem.getClassName(className)}
                open={open}
                {...restProps}
            >
                <div className={this.bem.getElement('container')}>
                    <header className={this.bem.getElement('header')}>
                        <Row>
                            <h2 className={this.bem.getElement('title')}>
                                {title}
                            </h2>
                            <IconButton
                                aria-label={`Close modal`}
                                className={this.bem.getElement('close-button')}
                                onClick={onClose}
                            >
                                <CloseButton />
                            </IconButton>
                        </Row>
                    </header>
                    <section className={this.bem.getElement('content')}>
                        <Row>
                            {children}
                        </Row>
                    </section>
                </div>
            </MaterialModal>
        )
    }
}
