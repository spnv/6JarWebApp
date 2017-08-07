"use strict"
import axios from 'axios';
// CREATE
export function createMember(_email, _password, _name) {
  return function(dispatch) {
    // TODO : Add [display, email, username] duplicate detector
    axios.post('/api/member', {
      email: _email,
      password: _password,
      name: _name
    }).then(function(response) {
      dispatch({
        type: "CREATE_MEMBER",
        payload: response.data
      })
    }).catch(function(err) {
      dispatch({
        type: "CREATE_MEMBER_REJECTED",
        payload: err
      })
    })
  }
}
// GET MEMBER SESSION
export function getMemberSession() {
  return function(dispatch) {
    axios.get('/api/member/signIn')
      .then(function(response) {
        dispatch({
          type: "GET_SESSION_MEMBER",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "GET_SESSION_MEMBER_REJECTED",
          payload: err
        })
      })
  }
}
// SIGN IN
export function signIn(_username, _password) {
  return function(dispatch) {
    axios.post('/api/member/signIn', {
        username: _username,
        password: _password
      })
      .then(function(response) {
        dispatch({
          type: "STORE_MEMBER",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "STORE_MEMBER_REJECTED",
          payload: err
        })
      })
  }
}
// DESTROY MEMBER SESSION
export function destroyMemberSession() {
  return function(dispatch) {
    axios.delete('/api/member/signIn')
      .then(function(response) {
        dispatch({
          type: "DESTROY_SESSION_MEMBER",
          payload: response.data
        })
      }).catch(function(err) {
        dispatch({
          type: "DESTROY_SESSION_MEMBER_REJECTED",
          payload: err
        })
      })
  }
}
