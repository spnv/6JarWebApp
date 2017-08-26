"use strict"
import {
  combineReducers
} from 'redux';
import {
  memberReducers
} from './memberReducer';
import {
  jarReducers
} from './jarReducer';
import {
  transactionReducers
} from './transactionReducer';
import {
  moneyFlowReducers
} from './moneyFlowReducer';
/* TODO : Template Active - import reducer */
// HERE IMPORT REDUCERS TO BE COMBINED
// import {
//   booksReducers
// } from './booksReducers';
// import {
//   cartReducers
// } from './cartReducers';

/* TODO : Template Active - assign reducer */
//HERE COMBINE THE REDUCERS
export default combineReducers({
  // books: booksReducers,
  // cart: cartReducers
  member: memberReducers,
  myJar: jarReducers,
  transaction: transactionReducers,
  moneyflow:moneyFlowReducers
})
