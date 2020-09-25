import { combineReducers } from 'redux';
import { recipeReducer } from './recipeReducer';
import { accountReducer } from '../reducers/index';

export default combineReducers({ recipeReducer, accountReducer });