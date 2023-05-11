import React, { useEffect } from "react";
import { EmptyCart } from "../components/cart/EmptyCart";
import { NotEmptyCart } from "../components/cart/NotEmptyCart";
import Loading from "../components/common/Loading";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../store/modules/cart";

function Cart() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.cart.loading);
  const cartItems = useSelector((state) => state.cart.cartItem);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  return <>{cartItems.length ? <NotEmptyCart /> : <EmptyCart />}</>;
}

export default Cart;
