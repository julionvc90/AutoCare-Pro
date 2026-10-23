import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/home.css';
import './styles/catalog.css';
import './styles/about.css';
import './styles/product.css';
import './styles/cart.css';
import './styles/contact.css';
import './styles/blog.css';
import './styles/login.css';
import './styles/admin.css';
import './styles/receipt.css';
import './styles/responsive.css';

import { ProductsProvider } from './context/ProductsContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import App from './App';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsProvider>
        <CartProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </CartProvider>
      </ProductsProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
