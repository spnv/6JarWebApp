"use strict"
//MEMBER REDUCERS
export function jarReducers(state = {
  selected: [],
  nonselected: []
}, action) {
  switch (action.type) {
    case "GET_JAR":
      let newSelectedJar = [];
      let newNonSelectedJar = [];

      action.payload.map(function(jar, i) {
        return new Promise((resolve) => {
          if (jar.selected == true) {
            // newSelectedJar.push(jar);
            newSelectedJar = [...newSelectedJar, ...[jar]];
          } else {
            // newNonSelectedJar.push(jar);
            newNonSelectedJar = [...newNonSelectedJar, ...[jar]];
          }
        })
      });
      // Promise.all(request).then(() => {
      //   return { ...state,
      //     selected: newSelectedJar,
      //     nonselected: newNonSelectedJar
      //   }
      // });
      return { ...state,
        selected: newSelectedJar,
        nonselected: newNonSelectedJar
      }
      break;
    case "GET_SELECTED_JAR":
      return { ...state,
        selected: action.payload
      }
      break;
      // case "GET_NON_SELECTED_JAR":
      //   return { ...state,
      //     nonselected: action.payload
      //   }
      //   break;
    case "UPDATE_ACTIVE_JAR":
      {
        let updatedJar = action.payload;
        let newNonSelectJarList = [];
        let newSelectJarList = [];
        if (updatedJar.selected == true) {
          // remove
          const currentNonSelectJarList = [...state.nonselected];
          const indexToDelete = currentNonSelectJarList.findIndex(function(jar) {
            return jar._id === updatedJar._id;
          })
          newNonSelectJarList = [...currentNonSelectJarList.slice(0, indexToDelete), ...currentNonSelectJarList.slice(indexToDelete + 1)]

          // add
          const currentSelectJarList = [...state.selected];
          newSelectJarList = [...currentSelectJarList, ...[updatedJar]];

        } else {
          const currentSelectJarList = [...state.selected];
          const indexToDelete = currentSelectJarList.findIndex(function(jar) {
            return jar._id === updatedJar._id;
          })
          newSelectJarList = [...currentSelectJarList.slice(0, indexToDelete), ...currentSelectJarList.slice(indexToDelete + 1)]

          // add
          const currentNonSelectJarList = [...state.nonselected];
          newNonSelectJarList = [...currentNonSelectJarList, ...[updatedJar]];

        }

        return { ...state,
          selected: newSelectJarList,
          nonselected: newNonSelectJarList
        }
      }
      break;
    case "UPDATE_A_JAR":
      {
        let updatedJar = action.payload;
        let newNonSelectJarList = [];
        let newSelectJarList = [];
        if (updatedJar.selected == false) {
          // remove
          const currentNonSelectJarList = [...state.nonselected];
          const indexToDelete = currentNonSelectJarList.findIndex(function(jar) {
            return jar._id === updatedJar._id;
          })
          newNonSelectJarList = [...currentNonSelectJarList.slice(0, indexToDelete), ...[updatedJar], ...currentNonSelectJarList.slice(indexToDelete + 1)]

          return { ...state,
            nonselected: newNonSelectJarList
          }
        } else {
          const currentSelectJarList = [...state.selected];
          const indexToDelete = currentSelectJarList.findIndex(function(jar) {
            return jar._id === updatedJar._id;
          })
          newSelectJarList = [...currentSelectJarList.slice(0, indexToDelete), ...[updatedJar], ...currentSelectJarList.slice(indexToDelete + 1)]

          return { ...state,
            selected: newSelectJarList
          }
        }
      }
      break;
  }
  return state
}
