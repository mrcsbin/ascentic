import React, { useState, useEffect } from "react";
import { EmptyCart } from "../components/cart/EmptyCart";
import { NotEmptyCart } from "../components/cart/NotEmptyCart";
import { getUserCart } from "../api/TempTitleApi";
import { getCookie } from "../utils/Cookies";
import Loading from "../components/common/Loading";

function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartItems = await getUserCart(getCookie("accessToken"));
      setCartItems(cartItems);
      setIsCartEmpty(cartItems.length === 0);
      setIsLoading(false);
      console.log(cartItems)
    };
    fetchCartItems();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return <>{isCartEmpty ? <EmptyCart /> : <NotEmptyCart />}</>;
}

export default Cart;
