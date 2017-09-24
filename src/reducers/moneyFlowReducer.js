"use strict"
//MEMBER REDUCERS
export function moneyFlowReducers(state = {
  myflow: []
}, action) {
  switch (action.type) {
    case "CREATE_MONEY_FLOW":
      let newMoneyFlow = action.payload;
      let currentMyFlow = [...state.myflow];
      let currentTotalAmount = state.totalAmount;

      const newMoneyFlows = [
        ...currentMyFlow,
        ...[newMoneyFlow]
      ];

      const newTotalAmount = currentTotalAmount + newMoneyFlow.amount;

      return { ...state,
        myflow: newMoneyFlows,
        totalAmount : newTotalAmount
      }
      break;
    case "GET_MONEY_FLOW":
      return { ...state,
        myflow: action.payload.items,
        totalAmount : action.payload.totalAmount
      }
      break;
    case "DELETE_MONEY_FLOW":

      let deletedMoneyFlow = action.payload;
      let currentTotalAmountToDelete = state.totalAmount;
      // remove
      let currentMoneyFlowToDelete = [...state.myflow];
      const indexToDelete = currentMoneyFlowToDelete.findIndex(function(item) {
        return item._id === deletedMoneyFlow._id;
      })

      const newMoneyFlowToDelete = [
        ...currentMoneyFlowToDelete.slice(0, indexToDelete),
        ...currentMoneyFlowToDelete.slice(indexToDelete + 1)
      ];

      const newTotalAmountAfterDelete = currentTotalAmountToDelete - deletedMoneyFlow.amount;

      return {
        ...state,
        myflow: newMoneyFlowToDelete,
        totalAmount : newTotalAmountAfterDelete
      }
      break;
  }
  return state
}
