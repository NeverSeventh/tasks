import {applyMiddleware, createStore} from 'redux';
import initialState from './initialState';
import reducer from './reducers/reducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';




const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(thunk)))



export default store;