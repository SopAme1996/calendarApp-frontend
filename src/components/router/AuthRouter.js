import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom"
import { LoginScreen } from '../auth/LoginScreen'


export const AuthRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/auth/login">
                    <LoginScreen />
                </Route>
                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    )
}