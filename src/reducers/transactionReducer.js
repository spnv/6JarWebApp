"use strict"
//MEMBER REDUCERS
export function transactionReducers(state = {
  today: []
}, action) {
  switch (action.type) {
    case "GET_TRANSACTION_TODAY":
      return { ...state,
        today: action.payload
      }
      break;
    case "CREATE_TRANSACTION_TODAY":
      let newTransaction = action.payload;
      let currentTodayTransaction = [...state.today];

      const newTodayTransaction = [
        ...currentTodayTransaction,
        ...[newTransaction]
      ];

      return { ...state,
        today: newTodayTransaction
      }
      break;
    case "DELETE_TRANSACTION_TODAY":

      let deletedTransaction = action.payload;
      // remove
      let currentTodayTransactionToDelete = [...state.today];
      const indexToDelete = currentTodayTransactionToDelete.findIndex(function(transaction) {
        return transaction._id === deletedTransaction._id;
      })

      const newTodayTransactionToDelete = [
        ...currentTodayTransactionToDelete.slice(0, indexToDelete),
        ...currentTodayTransactionToDelete.slice(indexToDelete + 1)
      ];

      return {
        ...state,
        today: newTodayTransactionToDelete
      }
      break;
  }
  return state
}
