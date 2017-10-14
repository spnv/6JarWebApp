"use strict"
import axios from 'axios';

// create
export function createAsset(
  _catagory,
  _risk_level,
  _description,
  _invest_amount,
  cb) {
  return function(dispatch) {
    axios.post('/api/asset/my-asset', {
      catagory: _catagory,
      risk_level : _risk_level,
      description: _description,
      invest_amount: _invest_amount
    }).then(function(response) {
      // cb()
      dispatch({
        type: "CREATE_ASSET",
        payload: response.data
      })
    }).catch(function(err) {
      // cb()
      dispatch({
        type: "CREATE_ASSET_REJECTED",
        payload: err
      })
    }).then(function() {
      cb()
    })
  }
}

// read
export function getAsset(cb) {
  return function(dispatch) {
    axios.get('/api/asset/my-asset')
      .then(function(response) {
        dispatch({
          type: "GET_ASSET",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "GET_ASSET_REJECTED",
          payload: err
        })
      }).then(function() {
        cb()
      })
  }
}
// update

// delete
export function removeAsset(_assetItem, cb) {
  return function(dispatch) {
    // TODO : Add duplicate detector
    axios.delete('/api/asset/my-asset/' + _assetItem._id, )
      .then(function(response) {
        dispatch({
          type: "DELETE_ASSET",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "DELETE_ASSET_REJECTED",
          payload: err
        })
      }).then(function() {
        cb()
      })
  }
}
