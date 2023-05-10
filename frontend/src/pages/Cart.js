import React, { useState, useEffect } from "react";
import { EmptyCart } from "../components/cart/EmptyCart";
import { NotEmptyCart } from "../components/cart/NotEmptyCart";
import { getCart } from "../api/CartApi";
import { getCookie } from "../utils/Cookies";
import Loading from "../components/common/Loading";

function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getCart(getCookie("accessToken"));
      setCartItems(cartItems);
      setIsCartEmpty(cartItems.length === 0);
      setIsLoading(false);
      console.log("Cart.js")
      console.log(cartItems)
    };
    fetchCartItems();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <>{isCartEmpty ? <EmptyCart /> : <NotEmptyCart cartItems={cartItems}/>}</>;
}

export default Cart;
