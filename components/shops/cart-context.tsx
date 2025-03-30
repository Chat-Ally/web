import { createContext, useContext, useState } from 'react';

interface CartItem {
    id: number;
    name?: string;
    price?: number;
    quantity?: number;
    image_url?: string;
    business_id?: number
}

interface CartContextValue {
    cartItems: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (itemId: number) => void;
    getSubtotal: () => number;
    updateQuantity: (itemId: number, newQuantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const addItem = (item: CartItem) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);

            if (existingItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], quantity: updatedItems[existingItemIndex].quantity || 0 + 1 };
                return updatedItems;
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const removeItem = (itemId: number) => {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    };

    const updateQuantity = (itemId: number, newQuantity: number) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const getSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const contextValue: CartContextValue = {
        cartItems,
        getSubtotal: getSubtotal,
        addItem: addItem,
        removeItem: removeItem,
        updateQuantity: updateQuantity,
        clearCart: clearCart,
    };

    return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};