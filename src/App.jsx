import { useState } from 'react'
import { createBrowserRouter, Navigate ,RouterProvider } from 'react-router-dom'
import MainLayout from "./Layouts/MainLayout/MainLayout"
import NewsFeed from './Pages/NewsFeed/NewsFeed'
import UserProfile from './Pages/UserProfile/UserProfile'
import NotFound from './Pages/NotFound/NotFound'
import AuthLayout from './Layouts/AuthLayout/AuthLayout'
import Register from './Pages/auth/Register/Register'
import Login from './Pages/auth/Login/Login'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import AuthProtectedRoutes from './components/ProtectedRoutes/AuthProtectedRoutes'


function App() {
    const router = createBrowserRouter ([
        { path :"/", element: <MainLayout /> ,children: [

            {index:true, element: <ProtectedRoutes> <Navigate to={"/home"} /> </ProtectedRoutes>},
            {path:"/home" , element: <ProtectedRoutes><NewsFeed /></ProtectedRoutes>},
           ]
        },
        { path :"/userprofile", element:<ProtectedRoutes> <UserProfile /> </ProtectedRoutes>},
        
         {path:"*",element:<NotFound />},

        { path :"/", element: <AuthLayout/>, children: [

            {path:"/register" , element :<AuthProtectedRoutes> <Register/> </AuthProtectedRoutes>},
            {path:"/login" ,element: <AuthProtectedRoutes> <Login /> </AuthProtectedRoutes>} 

        ]}
    ])
return<>

<RouterProvider router={router} />

</>
}

export default App
