import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import RootLayout from './components/layouts/RootLayout.jsx'
import Product from './pages/Product.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import AddProduct from './pages/AddProduct.jsx'
import Login from './pages/auth/Login.jsx'


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/product',
        element: <Product />
      },
      {
        path: '/product/:id',
        element: <ProductDetail />
      },
      {
        path: '/add-product',
        element: <AddProduct />
      },
    ]
  },
  {
        path: '/login',
        element: <Login/>
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
