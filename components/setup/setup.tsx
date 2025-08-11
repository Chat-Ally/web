import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { createClient } from "@/lib/supabase/component";
import { useRouter } from "next/router";
import { toast, Toaster } from "sonner";

export default function Setup(
    {
        user,
        profile,
        businessData,
    }: {
        user: any,
        profile: any,
        businessData: any,
    }
) {
    const router = useRouter()
    const supabase = createClient()

    const [name, setName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [businessName, setBusinessName] = useState<string>(businessData?.name ?? '')
    const [logo, setLogo] = useState()

    async function createWAPPContainer(businessId: number) {
        const { data, error } = await supabase
            .from("whatsapp-containers")
            .insert([{
                business_id: businessId,
            }])
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

    async function createBusiness() {
        const { data, error } = await supabase
            .from("business")
            .insert([{
                name: businessName,
                owner_id: user.user?.id,
            }])
        if (error) {
            toast.error(error.message)
            return false
        }
        return true
    }

    async function getBusinessId() {
        const { data, error } = await supabase
            .from("business")
            .select("id")
            .eq("owner_id", user.user?.id)
            .single()

        if (error) {
            console.error(error)
            toast.error(error.message)
            return null
        }
        if (data) {
            return data.id
        }
        return null
    }

    async function createProfile() {
        const { data, error } = await supabase
            .from("profiles")
            .insert([{
                user_id: user.user?.id,
                name: name,
                last_name: lastName
            }])
            .select()

        if (error) {
            console.error(error)
            toast.error(error.message)
            return false
        }
        if (data) {
            console.log("Profile created successfully:", data)
            return true
        }
        if (data === null) {
            console.error("No data returned after profile creation")
            return false
        }
    }

    async function handleCreateBusiness() {
        if (!businessName || !name) return
        let isBusinessCreated = await createBusiness()
        let isProfileCreated = await createProfile()
        if (isBusinessCreated) {
            const bussindessId = await getBusinessId()
            createWAPPContainer(bussindessId)
        }
        if (isProfileCreated && isBusinessCreated) {
            router.push('/setup/qr')
        } else {
            toast("Error al crear el negocio o el perfil")
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center align-middle">
            <div className="bg-slate-50 dark:bg-neutral-900 rounded-md border border-neutral-700 p-8 md:p-16 mx-4">
                <h1 className="font-bold text-2xl">Empecemos</h1>
                <h2>Vamos a configurar algunos detalles de tu negocio</h2>

                <div className="mt-2">
                    <Label htmlFor="username">Tu nombre</Label>
                    <Input
                        id="username"
                        type="text"
                        placeholder="Tu nombre"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mt-2">
                    <Label htmlFor="lastname">Tus apellidos</Label>
                    <Input
                        id="lastname"
                        type="text"
                        placeholder="Tus apellidos"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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


                <div className="mt-2 w-full">
                    {
                        businessData ?
                            <Button
                                className="w-full"
                                onClick={updateBusiness}
                            >
                                Continuar
                            </Button>
                            :
                            <Button
                                disabled={!businessName || !name}
                                onClick={handleCreateBusiness}
                            >
                                Guardar
                            </Button>
                    }
                </div>
            </div>
            <Toaster />
        </div>
    )
}