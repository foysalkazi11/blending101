import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise';
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const middleware = applyMiddleware(thunk,promiseMiddleware);
const store = createStore(rootReducer, middleware);

export default store;