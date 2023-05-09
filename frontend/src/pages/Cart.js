import React, { useState, useEffect } from "react";
import { EmptyCart } from "../components/cart/EmptyCart";
import { NotEmptyCart } from "../components/cart/NotEmptyCart";
import { getUserCart } from "../api/TempTitleApi";
import { getCookie } from "../utils/Cookies";

function Cart() {
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getUserCart(getCookie("accessToken"));
      setCartItems(cartItems);
      setIsCartEmpty(cartItems.length === 0);
    };
    fetchCartItems();
  }, []);

  return (
    <>
      {isCartEmpty ? <EmptyCart /> : <NotEmptyCart />}
      <div></div>
    </>
  );
}

export default Cart;
