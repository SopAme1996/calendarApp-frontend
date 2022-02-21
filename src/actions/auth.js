import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (mail, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken("auth/login", { mail, password }, "POST");
    const body = await resp.json();
    if (body.status) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startRegister = (name, mail, password, rppasword) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "auth/register",
      { name, mail, password, rppasword },
      "POST"
    );
    const body = await resp.json();

    if (body.status) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        register({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("auth/renew");
    const body = await resp.json();

    if (body.status) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => {
  return {
    type: types.authCheckingFinish,
  };
};

const register = (user) => {
  return {
    type: types.authStartRegister,
    payload: user,
  };
};

const login = (user) => {
  return {
    type: types.authLogin,
    payload: user,
  };
};

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(resetInitState());
    dispatch(logOut());
  };
};

const resetInitState = () => {
  return {
    type: types.resetInitialState,
  };
};

const logOut = () => {
  return {
    type: types.authLogout,
  };
};
