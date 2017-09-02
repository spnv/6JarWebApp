"use strict"
import axios from 'axios';

export function myJar() {
  return function(dispatch) {
    axios.get('/api/jar/my-jar')
      .then(function(response) {
        dispatch({
          type: "GET_JAR",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "GET_JAR_REJECTED",
          payload: err
        })
      })
  }
}

export function selectedJar() {
  return function(dispatch) {
    axios.get('/api/jar/my-selected')
      .then(function(response) {
        dispatch({
          type: "GET_SELECTED_JAR",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "GET_SELECTED_JAR_REJECTED",
          payload: err
        })
      })
  }
}
//
// export function nonSelectedJar() {
//   return function(dispatch) {
//     axios.get('/api/jar/my-non-selected')
//       .then(function(response) {
//         dispatch({
//           type: "GET_NON_SELECTED_JAR",
//           payload: response.data
//         })
//       }).catch(function(err) {
//         dispatch({
//           type: "GET_NON_SELECTED_JAR_REJECTED",
//           payload: err
//         })
//       })
//   }
// }

export function activeMyJar(_update) {
  return function(dispatch) {
    axios.patch('/api/jar/my-jar/', _update)
      .then(function(response) {
        dispatch({
          type: "UPDATE_ACTIVE_JAR",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "UPDATE_ACTIVE_JAR_REJECTED",
          payload: err
        })
      })
  }
}

export function updateAJar(_update, cb) {
  return function(dispatch) {
    axios.patch('/api/jar/my-jar/', _update)
      .then(function(response) {
        dispatch({
          type: "UPDATE_A_JAR",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "UPDATE_A_JAR_REJECTED",
          payload: err
        })
      }).then(function() {
        cb()
      })
  }
}
