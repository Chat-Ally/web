import ShippingAddressForm from "./add-address";

export default function CartShipping({
    onClickNext
}: {
    onClickNext: () => void
}) {
    return (
        <ShippingAddressForm onClickNext={onClickNext} />
    )
}