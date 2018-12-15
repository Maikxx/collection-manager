import * as React from 'react'
import { Page } from '../components/Layout/Page/Page'

interface Props {}

export class RootView extends React.Component<Props> {
    public render() {
        return (
            <Page className={`cm-RootView`}>
                Hoi
            </Page>
        )
    }
}
