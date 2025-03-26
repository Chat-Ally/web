'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/component';
import Link from 'next/link';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';

export default function QR({
    user,
    businessData
}: {
    user: any,
    businessData: any
}) {

    const supabase = createClient()
    const [qrCode, setQRCode] = useState()
    const [WAPPStatus, setWAPPStatus] = useState(false)

    useEffect(() => {
        async function createWAPPContainer() {
            let req = await fetch('/api/container')
            console.log(req)
            let res = await req.json()
            console.log(res)
            // setContainerCreated(res.ok)
        }
        createWAPPContainer()
    }, [])

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
                                <QRCodeCanvas
                                    className='mx-auto mt-4'
                                    size={256}
                                    value={qrCode}
                                />
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