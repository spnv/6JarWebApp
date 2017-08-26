"use strict"
//MEMBER REDUCERS
export function moneyFlowReducers(state = {
  myflow: []
}, action) {
  switch (action.type) {
    case "CREATE_MONEY_FLOW":
      let newMoneyFlow = action.payload;
      let currentMyFlow = [...state.myflow];

      const newMoneyFlows = [
        ...currentMyFlow,
        ...[newMoneyFlow]
      ];

      return { ...state,
        myflow: newMoneyFlows
      }
      break;
    case "GET_MONEY_FLOW":
      return { ...state,
        myflow: action.payload
      }
      break;
  }
  return state
}
