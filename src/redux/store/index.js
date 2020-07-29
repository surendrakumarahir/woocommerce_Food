/* eslint-disable import/imports-first */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import cartItems from '../reducers/cartItems';
import sharedData from '../reducers/sharedData';
import Config from '../reducers/config';
import { reducer as network, createNetworkMiddleware } from 'react-native-offline';
const middlewares = [thunk];
const networkMiddleware = createNetworkMiddleware({
  queueReleaseThrottle: 200,
});
const Cr = combineReducers({
  cartItems,
  sharedData,
  Config,
  network,
});

export default (store = createStore(Cr, applyMiddleware(networkMiddleware, ...middlewares)));
