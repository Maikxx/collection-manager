import './scss/index.scss'
import 'babel-polyfill'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { RootView } from './views/RootView'
import { ApolloProvider } from 'react-apollo'
import { client } from './services/ApolloService'

const App: React.SFC = () => (
    <ApolloProvider client={client}>
        <RootView />
    </ApolloProvider>
)

const rootElement = document.getElementById('react-root')

ReactDOM.render(<App />, rootElement)
