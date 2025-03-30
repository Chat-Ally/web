import CartDialog from './cart-dialog';

export default function ShopNavbar({
    business,
}: {
    business: any,
}) {
    return (
        <nav className='flex justify-between w-full p-1 align-middle items-center'>
            <div>
                {business?.name ?? ''}
                {business?.logo ?? ''}
            </div>
            <CartDialog />
        </nav>
    )
}