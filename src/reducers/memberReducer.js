"use strict"
//MEMBER REDUCERS
export function memberReducers(state = {
  mymember: {}
}, action) {
  switch (action.type) {
    case "CREATE_MEMBER":
      return { ...state,
        mymember: {
          data: action.payload.data,
          signin: action.payload.success,
          message: action.payload.message
        }
      }
      break;
    case "STORE_MEMBER":
      return { ...state,
        mymember: {
          data: action.payload.data,
          signin: action.payload.success,
          message: action.payload.message
        }
      }
      break;
    case "GET_SESSION_MEMBER":
      return { ...state,
        mymember: {
          data: action.payload.data,
          signin: action.payload.success,
          message: action.payload.message
        }
      }
      break;
    case "DESTROY_SESSION_MEMBER":
      return { ...state,
        mymember: {
          data: action.payload.data,
          signin: action.payload.success,
          message: action.payload.message
        }
      }
      break;
  }
  return state
}
