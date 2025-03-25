import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createClient } from "@/lib/supabase/component";
import { useRouter } from "next/router";

export default function Setup(
    {
        businessData,
        containerExists
    }: {
        businessData: any,
        containerExists: any
    }
) {
    console.log("businessData", businessData)
    console.log("containerExists", containerExists)
    const router = useRouter()
    const supabase = createClient()

    const [name, setName] = useState<string>("")
    const [businessName, setBusinessName] = useState<string>(businessData?.name ?? '')
    const [logo, setLogo] = useState()
    const [containerCreated, setContainerCreated] = useState(containerExists?.id ? true : false)

    console.log("containerExists", containerExists)

    async function createWAPPContainer() {
        let req = await fetch('/api/container')
        console.log(req)
        let res = await req.json()
        console.log(res)
        setContainerCreated(res.ok)
    }

    async function createBusiness() {
        const { data: user, error: userError } = await supabase.auth.getUser() // this probably not needed
        const { data, error } = await supabase
            .from("business")
            .insert([{
                name: businessName,
                owner_id: user.user?.id,
            }])
            .select()
        if (error) console.error(error)
    }

    async function updateBusiness() {
        const { data, error } = await supabase
            .from("business")
            .update({
                name: businessName
            })
            .eq("id", businessData?.id)
            .select()

        containerExists ? console.log("si existe xd ") : console.log("no existe")
        if (containerExists) {
            router.push('/setup/qr')
        } else {
            createWAPPContainer()
        }
    }

    async function handleCreateBusiness() {
        await createBusiness()
        await createWAPPContainer()
        router.push('/setup/qr')
    }

    return (
        <div className="w-full h-screen flex justify-center items-center align-middle">
            <div className="bg-slate-50 dark:bg-neutral-900 rounded-md border border-neutral-700 p-8 md:p-16 mx-4">
                <h1 className="font-bold text-2xl">Empecemos {businessData?.name} </h1>
                <h2>Vamos a configurar algunos detalles de tu negocio</h2>
                {/* not feeling like this is usefull */}
                {/* <div className="mt-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="Escribe tu nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div> */}

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

                {/* <Button
                    onClick={createWAPPContainer}
                >
                    Check if container exists
                </Button> */}

                {
                    businessData ?
                        <Button
                            onClick={updateBusiness}
                            className="mt-2"
                        >
                            Continuar
                        </Button>
                        :
                        <Button
                            onClick={handleCreateBusiness}
                        >
                            Guardar
                        </Button>
                }
            </div>
        </div>
    )
}