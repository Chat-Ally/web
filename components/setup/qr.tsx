'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/component';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function QR({
    user,
    businessData
}: {
    user: any,
    businessData: any
}) {

    const supabase = createClient()
    const [qrCode, setQRCode] = useState() // QR Code is no longer a code, but a URL to the QR code image
    const [WAPPStatus, setWAPPStatus] = useState(false)

    useEffect(() => {
        const channel = supabase.channel('qr')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'whatsapp-containers',
                    filter: `business_id=eq.${businessData.id}`
                },
                (payload: any) => {
                    console.log(WAPPStatus)
                    setWAPPStatus(payload.new.status === "authenticated")
                    console.log(WAPPStatus)
                    setQRCode(payload.new.qr)
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    return (
        <div className="h-screen flex flex-col justify-center ">
            <Card className='mx-auto max-w-md dark:bg-neutral-900'>
                <CardHeader>
                    <CardTitle >Empecemos</CardTitle>
                    {
                        WAPPStatus ?
                            <CardDescription>Se configuró tu whatsapp. En unos minutos empezaremos a responder tus mensajes.</CardDescription>
                            :
                            <CardDescription>En tu teléfono, abre Whatsapp, dirigete a "Vincular dispositivo" y escanea este código para poder automatizar tu cuenta.</CardDescription>
                    }
                </CardHeader>
                <CardContent>
                    {
                        WAPPStatus ?
                            <></>
                            :
                            qrCode ?
                                <div>
                                    <img src={qrCode} className='mx-auto h-24 mt-4' alt='QR Code' />
                                </div>
                                :
                                <>loading</>
                    }
                </CardContent>
                <CardFooter>
                    {
                        WAPPStatus ?
                            <Link href="/dashboard">
                                <Button className='mt-4'>Finalizar</Button>
                            </Link>
                            : <></>
                    }
                </CardFooter>
            </Card>
        </div>
    )
}