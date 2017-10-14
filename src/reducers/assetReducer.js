"use strict"
//MEMBER REDUCERS
export function assetReducers(state = {
  myasset: []
}, action) {
  switch (action.type) {
    case "CREATE_ASSET":
      let newAsset = action.payload;
      let currentAsset = [...state.myasset];
      let currentTotalAmount = state.totalAmount;

      const newAssets = [
        ...currentAsset,
        ...[newAsset]
      ];

      const newTotalAmount = currentTotalAmount + newAsset.invest_amount;

      return { ...state,
        myasset: newAssets,
        totalAssetAmount : newTotalAmount
      }
      break;
    case "GET_ASSET":
      return { ...state,
        myasset: action.payload.items,
        totalAssetAmount : action.payload.totalAmount
      }
      break;
    case "DELETE_ASSET":

      let deletedAsset = action.payload;
      let currentTotalAmountToDelete = state.totalAmount;
      // remove
      let currentAssetToDelete = [...state.myasset];
      const indexToDelete = currentAssetToDelete.findIndex(function(item) {
        return item._id === deletedAsset._id;
      })

      const newAssetToDelete = [
        ...currentAssetToDelete.slice(0, indexToDelete),
        ...currentAssetToDelete.slice(indexToDelete + 1)
      ];

      const newTotalAmountAfterDelete = currentTotalAmountToDelete - deletedAsset.invest_amount;

      return {
        ...state,
        myasset: newAssetToDelete,
        totalAssetAmount : newTotalAmountAfterDelete
      }
      break;
  }
  return state
}
