import { createSlice } from "@reduxjs/toolkit";
const uiSlice=createSlice({
    name:'ui',
    initialState:{
        canvas:null,
        optionsIsVisible:false
       },
    reducers:{
        toggleOptions(state,action){
           
            state.optionsIsVisible = action.payload.optionsIsVisible;

        },
        setCanvas(state,action){
          
            return({...state, canvas:action.payload})
        },
    }
})
export const uiActions=uiSlice.actions
export default uiSlice