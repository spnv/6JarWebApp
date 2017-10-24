"use strict"
import axios from 'axios';

export function sendMessage(_name, _email, _type, _message, cb) {
  return function(dispatch) {
    // TODO : Add duplicate detector
    axios.post('/api/message/my-msg', {
      name: _name,
      email: _email,
      type: _type,
      message: _message
    }).then(function(response) {
      dispatch({
        type: "CREATE_MESSAGE",
        payload: response.data
      })
    }).catch(function(err) {
      dispatch({
        type: "CREATE_MESSAGE_REJECTED",
        payload: err
      })
    }).then(function() {
      cb()
    })
  }
}
