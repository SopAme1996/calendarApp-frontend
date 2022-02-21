import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import { AuthRouter } from "./AuthRouter";
import { PublicRouter } from "./PublicRouter";
import { PrivateRouter } from "./PrivateRouter";
import { CalendarScreen } from "../calendar/CalendarScreen";
import { useDispatch, useSelector } from "react-redux";
import { startChecking } from "../../actions/auth";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h1>Please, wait....</h1>;
  }

  return (
    <Router>
      <Switch>
        <PublicRouter
          path="/auth"
          component={AuthRouter}
          isAuthenticated={!!uid}
        />

        <PrivateRouter
          exact
          path="/"
          component={CalendarScreen}
          isAuthenticated={!!uid}
        />

        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  );
};
