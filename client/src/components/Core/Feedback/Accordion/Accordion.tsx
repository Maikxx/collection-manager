import './Accordion.scss'
import * as React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FilterIcon from '@material-ui/icons/FilterList'
import Typography from '@material-ui/core/Typography'
import { BEM } from '../../../../services/BEMService'

interface Props {
    buttonText: string
    className?: string
}

interface State {
    isExpanded: boolean
}

export class Accordion extends React.Component<Props, State> {
    public state: State = {
        isExpanded: false,
    }

    private bem = new BEM('Accordion', () => ({
        'cm-Accordion--is-expanded': this.state.isExpanded,
    }))

    public render() {
        const { buttonText, children, className } = this.props

        return (
            <ExpansionPanel
                className={this.bem.getClassName(className)}
                onChange={this.onChange}
            >
                <ExpansionPanelSummary
                    className={this.bem.getElement('header')}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <FilterIcon className={this.bem.getElement('icon')}/>
                    <Typography
                        className={this.bem.getElement('text')}
                        variant={`subheading`}
                    >
                        {buttonText}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={this.bem.getElement('content')}>
                    {children}
                </ExpansionPanelDetails>
            </ExpansionPanel>
        )
    }

    private onChange = (event: any, expanded: boolean) => {
        this.setState({ isExpanded: expanded })
    }
}
