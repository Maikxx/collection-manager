import './scss/index.scss'
import 'babel-polyfill'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { RootView } from './views/RootView'
import { ApolloProvider } from 'react-apollo'
import { client } from './services/ApolloService'
import { BrowserRouter, Route } from 'react-router-dom'
import { routes } from './views/routes'

const App: React.SFC = () => (
    <BrowserRouter>
        <ApolloProvider client={client}>
            <Route
                path={routes.index}
                component={RootView}
            />
        </ApolloProvider>
    </BrowserRouter>
)

const rootElement = document.getElementById('react-root')

ReactDOM.render(<App />, rootElement)
