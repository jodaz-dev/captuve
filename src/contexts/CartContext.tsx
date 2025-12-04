import { createContext, useContext, useState, ReactNode } from "react";
import { Photo } from "@/data/mockData";

interface CartItem extends Photo {
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (photo: Photo, price?: number) => void;
  removeFromCart: (photoId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (photo: Photo, price: number = 5) => {
    setItems((prev) => {
      const exists = prev.find((item) => item.id === photo.id);
      if (exists) return prev;
      return [...prev, { ...photo, price }];
    });
  };

  const removeFromCart = (photoId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== photoId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.length;
  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, clearCart, totalItems, totalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
