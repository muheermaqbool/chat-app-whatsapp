import React,{createContext,useContext,useReducer} from 'react'
 export let StateContext =createContext();
export  let StateProvider =({reducer,initialState,children}) =>(
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
)
 export let useStateValue =()=>useContext
 (StateContext);
