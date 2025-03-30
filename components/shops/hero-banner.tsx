export default function HeroBanner() {
    return (
        <div className="relative w-full h-[450px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent z-10" />
            <img
                src='https://fxyribxpczjutxfikcuw.supabase.co/storage/v1/object/public/landing//Galaxy%20Tab%20S8%20Ultra.png'
                className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out"
            />
        </div>
    )
}