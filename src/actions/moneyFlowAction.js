"use strict"
import axios from 'axios';

// create
export function createMoneyFlow(
  _type,
  _sub_type,
  _amount,
  _description, cb) {
  return function(dispatch) {
    axios.post('/api/money-flow/my-flow', {
      type: _type,
      sub_type: _sub_type,
      amount: _amount,
      description: _description
    }).then(function(response) {
      // cb()
      dispatch({
        type: "CREATE_MONEY_FLOW",
        payload: response.data
      })
    }).catch(function(err) {
      // cb()
      dispatch({
        type: "CREATE_MONEY_FLOW_REJECTED",
        payload: err
      })
    }).then(function() {
      cb()
    })
  }
}

// read
export function getMoneyFlow(cb) {
  return function(dispatch) {
    axios.get('/api/money-flow/my-flow')
      .then(function(response) {
        dispatch({
          type: "GET_MONEY_FLOW",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "GET_MONEY_FLOW_REJECTED",
          payload: err
        })
      }).then(function() {
        cb()
      })
  }
}
// update

// delete
export function removeMoneyFlow(_flowItem, cb) {
  return function(dispatch) {
    // TODO : Add duplicate detector
    axios.delete('/api/money-flow/my-flow/' + _flowItem._id, )
      .then(function(response) {
        dispatch({
          type: "DELETE_MONEY_FLOW",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "DELETE_MONEY_FLOW_REJECTED",
          payload: err
        })
      }).then(function() {
        cb()
      })
  }
}
