"use strict"
import axios from 'axios';

export function createTransaction(_code, _display, _des, _amount, _type) {
  return function(dispatch) {
    // TODO : Add duplicate detector
    axios.post('/api/transaction/today', {
      code: _code,
      display: _display,
      description: _des,
      amount: _amount,
      type: _type
    }).then(function(response) {
      dispatch({
        type: "CREATE_TRANSACTION_TODAY",
        payload: response.data
      })
    }).catch(function(err) {
      dispatch({
        type: "CREATE_TRANSACTION_TODAY_REJECTED",
        payload: err
      })
    })
  }
}

export function getTodayTransaction() {
  return function(dispatch) {
    // TODO : Add duplicate detector
    axios.get('/api/transaction/today')
      .then(function(response) {
        dispatch({
          type: "GET_TRANSACTION_TODAY",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "GET_TRANSACTION_TODAY_REJECTED",
          payload: err
        })
      })
  }
}

export function removeTodayTransaction(_transaction) {
  return function(dispatch) {
    // TODO : Add duplicate detector
    axios.delete('/api/transaction/today/' + _transaction._id, )
      .then(function(response) {
        dispatch({
          type: "DELETE_TRANSACTION_TODAY",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "DELETE_TRANSACTION_TODAY_REJECTED",
          payload: err
        })
      })
  }
}
