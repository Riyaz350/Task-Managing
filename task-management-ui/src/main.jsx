import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import AuthProvider from './Authentication/AuthProvider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Layout/Home/Home.jsx';
import LandingPage from './Layout/Home/LandingPage/LandingPage.jsx';
import LogIn from './Authentication/LogIn/LogIn.jsx';
import Register from './Authentication/Register/Register.jsx';
import ForgotPass from './Authentication/ForgotPass.jsx';
import Dashboard from './Layout/Dashboard/Dashboard.jsx';
import AllTasks from './Layout/Dashboard/AllTasks/AllTasks.jsx';
import CollaboratedTasks from './Layout/Dashboard/CollaboratedTasks/CollaboratedTasks.jsx';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children:[
      {
        path:'/',
        element:<LandingPage></LandingPage>
      },
      {
        path:'/logIn',
        element:<LogIn></LogIn>
      },
      {
        path:'/register',
        element:<Register></Register>
      },
      {
        path:'/forgotPass',
        element:<ForgotPass></ForgotPass>
      },
    ]
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children:[
      {
        path:'allTasks',
        element:<AllTasks></AllTasks>
      },
      {
        path:'collTasks',
        element:<CollaboratedTasks></CollaboratedTasks>
      },
      
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
