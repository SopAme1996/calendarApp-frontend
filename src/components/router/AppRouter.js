import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';


import { AuthRouter } from './AuthRouter';
import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';
import { CalendarScreen } from '../calendar/CalendarScreen';


export const AppRouter = () => {
    // const [checking, setChecking] = useState(true);
    // const [isLoggeIn, setisLoggeIn] = useState(false)

    // useEffect(() => {

    // }, []);

    // if (checking) {
    //     return (
    //         <h1>Please, wait....</h1>
    //     )
    // }

    return (
        <Router>
            <Switch>
                <PublicRouter
                    path="/auth"
                    component={AuthRouter}
                    isAuthenticated={false}
                />

                <PrivateRouter
                    exact
                    path="/"
                    component={CalendarScreen}
                    isAuthenticated={false}
                />

                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    );
}