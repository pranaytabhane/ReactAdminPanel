/* eslint-disable */
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from "react-redux";
import AdminLayout from "layouts/Admin.js";
// import SignIn from "views/SignIn";
import SignIn from "./views/Login/SignIn";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import Loader from "components/Loader/Loader";
import ProtectedRoute from "./components/AuthGuard";
import { ToastContainer } from "react-toastify";
import configureStore from "./config";

const App = () => {
  const { persistor, store } = configureStore(history);
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Loader />
          <Routes>
            <Route path="/" element={<SignIn to="/login" />} />
            <Route path="/login" element={<SignIn to="/login" />} />
            <Route
              path="/admin/*"
              element={<ProtectedRoute element={AdminLayout} />}
            />
          </Routes>
          <ToastContainer autoClose={5000} limit={1} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
