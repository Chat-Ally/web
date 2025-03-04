import { HeroTitle } from "./background";

export default function Footer() {
    return (
        <div >
            <footer className="z-10 px-8">
                <HeroTitle>enwhats</HeroTitle>
                <div className="flex justify-between md:w-96 md:mx-auto">
                    <div>
                        <p className="font-bold text-lg">Empresa</p>
                        <p className="text-sm">Sobre nosotros</p>
                        <p className="text-sm">Carreras</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg">Redes</p>
                        <p className="text-sm">Instagram</p>
                        <p className="text-sm">Facebook</p>
                        <p className="text-sm">Whatsapp</p>
                        <p className="text-sm">Tiktok</p>
                    </div>
                    <div>
                        <p className="font-bold text-lg">Ayuda</p>
                        <p className="text-sm">Contacto</p>
                        <p className="text-sm">Preguntas frecuentes</p>
                    </div>
                </div>
            </footer>
            <div className="w-full mx-auto flex justify-center my-4">
                <div className="">enwhats, 2024 ©</div>
            </div>
        </div>
    )
}