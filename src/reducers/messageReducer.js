"use strict"
/* TODO : Template Passive - assign reducer */

export function messageReducers(state = {
  message: []
}, action) {
  switch (action.type) {
    case "CREATE_MESSAGE":
      return { ...state
      }
      break;
    case "CREATE_MESSAGE_REJECTED":
      return { ...state
      }
      break;
  }
  return state
}
