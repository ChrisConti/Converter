import { createStore, compose, applyMiddleware } from "redux";
import {
  persistStore,
  persistReducer,
  persistCombineReducers
} from "redux-persist";
import thunk from "redux-thunk";
import reducers from "../reducers";
import { AsyncStorage } from "react-native";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["ListSearch"] // only navigation will be persisted
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);
export default (initialState = {}) => {
  let store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(thunk)
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
