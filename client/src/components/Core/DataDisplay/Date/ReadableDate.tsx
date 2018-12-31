import * as React from 'react'

interface Props {
    date: string
}

export class ReadableDate extends React.Component<Props> {
    public render() {
        const { date } = this.props

        return (
            <React.Fragment>
                {new Date(date).toLocaleDateString()}
            </React.Fragment>
        )
    }
}
