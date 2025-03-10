import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';


export default function QR() {
    return (
        <div className="w-full h-screen flex justify-center items-center align-middle">
            <div className="bg-slate-50 rounded-md border p-8 md:p-16 mx-4">
                <h1 className="font-bold text-2xl">Empecemos</h1>
                <h2>En Whatsapp, dirigete a "Vincular dispositivo" y escanea este codigo.</h2>
                <QRCodeCanvas className='mx-auto mt-12' size={256} value={"https://hola.com"} />
                <Link href="/dashboard">
                    <Button className='mt-12'>Finalizar</Button>
                </Link>
            </div>
        </div>
    )
}