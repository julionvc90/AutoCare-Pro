import React from 'react';
import Navbar from './src/components/Navbar';
import Footer from './src/components/Footer';
import Categorias from './src/views/shop/Categorias';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main className="container my-4">
        <Categorias />
      </main>
      <Footer />
    </div>
  );
}

export default App;