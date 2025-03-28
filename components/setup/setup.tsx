import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createClient } from "@/lib/supabase/component";
import { useRouter } from "next/router";

export default function Setup(
    {
        businessData,
    }: {
        businessData: any,
    }
) {
    const router = useRouter()
    const supabase = createClient()

    const [name, setName] = useState<string>("")
    const [businessName, setBusinessName] = useState<string>(businessData?.name ?? '')
    const [logo, setLogo] = useState()

    async function createWAPPContainer() {
        let req = await fetch('/api/container')
        console.log(req)
        let res = await req.json()
        console.log(res)
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

        router.push('/setup/qr')
    }

    async function handleCreateBusiness() {
        await createBusiness()
        router.push('/setup/qr')
    }

    return (
        <div className="w-full h-screen flex justify-center items-center align-middle">
            <div className="bg-slate-50 dark:bg-neutral-900 rounded-md border border-neutral-700 p-8 md:p-16 mx-4">
                <h1 className="font-bold text-2xl">Empecemos</h1>
                <h2>Vamos a configurar algunos detalles de tu negocio</h2>
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