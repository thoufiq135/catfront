import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from "./home"
import Chat from "./chat"
import {Provider} from "react-redux"
import Store from './reactredux.js'
function App() {

const route=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/Chat",
    element:<Chat/>
  }
])

 


  return (
    <Provider store={Store}>
    <RouterProvider router={route}/>    
    </Provider>
  )
}

export default App
