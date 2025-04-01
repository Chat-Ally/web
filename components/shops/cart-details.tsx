import { createClient } from "@/lib/supabase/component";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { useCart } from "./cart-context";
import CartItem from "./cart-item";
import OrderSummary from "./order-summary";

export default function CartDetails({
    onClickNext
}: {
    onClickNext: () => void
}) {
    const { cartItems, getSubtotal } = useCart()
    const supabase = createClient()
    async function handleOnClickNext() {

        try {
            const { data: orderData, error: orderError } = await supabase
                .from("orders")
                .insert([
                    {
                        total: getSubtotal() + 29,
                        subtotal: getSubtotal(),
                        business_id: 1,
                        status: "complete"
                    }
                ])
                .select()

            if (orderError) console.error(orderError.message);
            if (orderData) {

                console.log(orderData)

                // If order is successfully inserted, extract the new order ID
                const orderId = orderData[0].id;

                if (!orderId) {
                    console.log("Failed to get Order ID from insertion response.");
                    return;
                }

                // Prepare data for `product_order` table
                const productOrders = cartItems.map(item => ({
                    order_id: orderId,
                    product_id: item.id, // Assuming `item` has an `id`
                    quantity: item.quantity || 1 // Assuming `item` has a `quantity` field
                }));


                // Insert into `product_order` for each product
                const { error: insertProductOrderError } = await supabase
                    .from("product_order")
                    .insert(productOrders);

                if (insertProductOrderError) {
                    console.error(`Error inserting into product_order: ${insertProductOrderError.message}`);
                }
            }

        } catch (err) {
            console.error("Error inserting order:", err);
        } finally {
        }

        onClickNext()
    }


    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-[95vw] sm:max-w-[700px] lg:max-w-[900px] overflow-y-auto max-h-[90vh]">
            {cartItems.length < 1 ?
                <DialogTitle>Tu carrito está vacío</DialogTitle>
                :
                <div className="flex w-full">
                    <DialogHeader className="w-2/3">
                        <DialogTitle>Carrito </DialogTitle>
                        {cartItems.map((el) => (
                            <CartItem product={el} key={el.id} />
                        ))}
                    </DialogHeader>
                    <OrderSummary onClickNext={handleOnClickNext} />
                </div>
            }
        </div>
    )
}