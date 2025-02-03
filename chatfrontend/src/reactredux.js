import {configureStore} from "@reduxjs/toolkit"
import chattingReducer from "./slice1.jsx"
const Store  =configureStore({
    reducer:{
        chatting:chattingReducer

    }
})
export default Store;