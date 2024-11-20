import {createSlice} from "@reduxjs/toolkit";

const initialState={
    user:localStorage.getItem('userInfo')?(localStorage.getItem('userInfo'))
    :null,

    isSidebarOpen:false,
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            /*action of the payload being assigned to the user */
            state.user=action.payload;
            localStorage.setItems('userInfo',JSON.stringify(action.payload));
        },
        logout:(state,action)=>{ 
            state.user=null;
            localStorage.removeItem("userInfo");
        },
        setOpenSidebar:(state,action)=>{
            state.isSidebarOpen=action.payload;
        }
    },

})

export const{setCredentials,logout,setOpenSidebar}=authSlice.actions;

export default authSlice.reducer;