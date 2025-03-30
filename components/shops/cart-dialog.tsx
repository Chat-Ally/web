import { ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useCart } from "./cart-context";
import { useEffect } from "react";
import { Button } from "../ui/button";

export default function CartDialog() {
    const { cartItems, addItem } = useCart()
    const products = [
        { id: 1, name: 'Product A', price: 10 },
        { id: 2, name: 'Product B', price: 20 },
        { id: 3, name: 'Product C', price: 15 },
    ];

    useEffect(() => {
        addItem(products[1])
    }, [])

    return (
        <Dialog>
            <DialogTrigger>
                <div className="hover:bg-slate-100 rounded-full p-2">
                    <ShoppingCart />
                </div>
            </DialogTrigger>
            <DialogContent className="p-4 sm:p-6 lg:p-8 max-w-[95vw] sm:max-w-[700px] lg:max-w-[900px] overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Carrito </DialogTitle>
                    {cartItems.map((el) => (
                        <div>
                            {el.name}
                        </div>
                    ))}
                </DialogHeader>
                <p>Productos</p>
                <p>Envío</p>
                <p>Total</p>
                <Button>Finalizar compra</Button>
            </DialogContent>
        </Dialog>

    )
}