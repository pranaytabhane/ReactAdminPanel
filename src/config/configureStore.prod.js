/*
 * @file: configureStore.dev.js
 * @description: Configure/creating redux store with thunk,reducer etc
 * @author: Nk
 * */

import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from "redux-persist";
import reducers from "../context/reducers";
// import logger from "redux-logger"

export default () => {
  const store = configureStore({
    reducer: reducers
  })
  
  const persistor = persistStore(store);
  return { persistor, store };
};
