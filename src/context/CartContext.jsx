import { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
      console.error("Error parsing localStorage cart:", e);
      return [];
    }
  });

  // Save to localStorage on cart change
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Toast refs to prevent duplicates
  const addToastRef = useRef(false);
  const removeToastRef = useRef(false);
  const updateToastRef = useRef(false);

  const addToCart = (item) => {
    if (!addToastRef.current) {
      const existing = cart.find((i) => i.id === item.id);
      existing ? toast.info("Increased quantity in cart") : toast.success("Added to cart");
      addToastRef.current = true;
      setTimeout(() => (addToastRef.current = false), 250);
    }

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    if (!removeToastRef.current) {
      toast.warn("Removed from cart");
      removeToastRef.current = true;
      setTimeout(() => (removeToastRef.current = false), 250);
    }

    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (!updateToastRef.current) {
      toast("Updated quantity");
      updateToastRef.current = true;
      setTimeout(() => (updateToastRef.current = false), 250);
    }

    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
