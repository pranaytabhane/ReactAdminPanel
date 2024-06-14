import configureStore from "../../config";
const { persistor } = configureStore();

export const loader = (flag) => {
  return (dispatch) => {
    dispatch({ type: "ISLOADING", data: flag });
  };
};

export const logout = () => {
  return (dispatch) => {
    persistor.purge();
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
  };
};
export const sidebar_toggle = (data) => {
  return (dispatch) => {
    dispatch({ type: "TOGGLE", data: data });
  };
};
