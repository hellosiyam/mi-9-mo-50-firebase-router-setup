import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Main from './layout/Main';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Register2 from './components/Register2/Register2';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children : [
      {
        path : '/',
        element : <Home></Home>
      },
      {
        path : 'login',
        element : <Login></Login>
      },
      {
        path : 'register',
        element : <Register></Register>
      },
      {
        path : 'register2', 
        element : <Register2></Register2>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
