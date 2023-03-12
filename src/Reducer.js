export  let initialState ={
    user:null,
};
export  let actionTypes ={
    SET_USER:" SET_USER",
};
 let reducer =(state,action)=>{
    switch(action.type){
        case actionTypes.SET_USER:
            return{
                ...state,user:action.user,
            };
            default:
                return state;
    }
 };
 export default reducer;