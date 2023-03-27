import React, {useState, useEffect} from 'react';
// import Products1 from './components/products/Products1';
import {NavBar, Products1,Cart, Checkout} from './components';

import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';


import { commerce } from './library/commerce';



const App = () => {
   const [products, setProducts] = useState([]);
   const [cart, setCart] = useState([]);
   const [order, setOrder] = useState({});
   const [errorMessage,setErrorMessage] = useState('');

   const fetchProducts = async () => {
    const {data} = await commerce.products.list();
      
        setProducts(data);
   }

   

   const fetchCart = async () => {
     const cart = await commerce.cart.retrieve();

     setCart(cart);

    }
    
    
  useEffect(() => {
   fetchProducts();
   fetchCart();
   },[]);
  

   const handleAddToCart = async (productId, quantity) => {
     const cart = await commerce.cart.add(productId, quantity);
     
     setCart(cart);
   }

   

   const handleUpdateCartQty = async (productId, quantity) => {
    const cart = await commerce.cart.update(productId, {quantity});
     setCart(cart);
   }

   const handleRemoveFromCart = async (productId) => {
    const cart = await commerce.cart.remove(productId);
    setCart(cart);
   }
const refershCart = async () => {
  const newCart = await commerce.cart.refersh();
  setCart(newCart);
}
  
  
   const handleEmptyCart = async () => {
    const cart = await commerce.cart.empty();
    setCart(cart);

   }

  

   const handleCaptureCheckout = async(checkoutTokenId,newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refershCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
   }

  
  
  

  return (
    <Router>
    <>
       <NavBar totalItems={cart.total_items}/>

       <Link to="/">{Products1}</Link>
       <Link to="/Cart">{Cart}</Link>
       <Link to="/Checkout">{Checkout}</Link>

       <Routes>
      
      <Route exact path='/' element={<Products1 products={ products } onAddToCart={ handleAddToCart }/>} ></Route>
      <Route exact path='/cart' element={<Cart cart={cart} handleEmptyCart={handleEmptyCart} handleRemoveFromCart={handleRemoveFromCart} handleUpdateCartQty={handleUpdateCartQty}/>} ></Route>
      <Route exact path='/Checkout' element={<Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage}/>}></Route>
       </Routes>
       
    </>
    </Router>
  )
}

export default App;
