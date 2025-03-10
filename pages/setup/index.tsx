import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Link from "next/link";

export default function Setup() {

    const [name, setName] = useState<string>("")
    const [businessName, setBusinessName] = useState<string>("")
    const [logo, setLogo] = useState()

    return (
        <div className="w-full h-screen flex justify-center items-center align-middle">
            <div className="bg-slate-50 rounded-md border p-8 md:p-16 mx-4">
                <h1 className="font-bold text-2xl">Empecemos</h1>
                <h2>Vamos a configurar algunos detalles de tu negocio</h2>

                <div className="mt-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Escribe tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>


                <div className="mt-2">
                    <Label htmlFor="business_name">Nombre de tu negocio</Label>
                    <Input
                        id="business_name"
                        type="text"
                        placeholder="Escribe el nombre de tu negocio"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                    />
                </div>


                <div className="mt-2">
                    <Label />
                    <Label htmlFor="logo_image">Sube tu logo</Label>
                    <Input
                        id="logo_image"
                        type="file"
                        placeholder="Elija un archivo"
                        value={logo}
                    />
                </div>

                <Link href={'/setup/qr'}>
                    <Button className="mt-2">Guardar y continuar</Button>
                </Link>
            </div>
        </div>
    )
}