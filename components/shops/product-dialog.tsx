import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function ProductDetailsDialog({ open, onOpenChange, productDetails }: { open: boolean, onOpenChange: (val: boolean) => void, productDetails: any }) {
    // if (!productDetails) return null;
    console.log(productDetails)
    const { toast } = useToast()

    function handleAddtoCart() { }

    function handelDialogClose() {
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={handelDialogClose}>
            <DialogContent className="p-4 sm:p-6 lg:p-8 max-w-[95vw] sm:max-w-[700px] lg:max-w-[900px] overflow-y-auto max-h-[90vh]">
                <DialogTitle className="text-center text-2xl font-bold sm:text-3xl mb-6">
                    {productDetails?.title || "Detalles del producto"}
                </DialogTitle>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                        <img
                            src={productDetails?.image_url || "/placeholder.jpg"}
                            alt={productDetails?.name || "Sin título"}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-semibold tracking-tight">
                                {productDetails?.name || "Producto sin nombre"}
                            </h2>
                            <p className="text-muted-foreground text-base leading-relaxed">
                                {productDetails?.description || "Sin descripción"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-5 h-5 fill-primary text-primary"
                                    />
                                ))}
                            </div>
                            <span className="text-muted-foreground">(4.5)</span>
                        </div>

                        <div className="flex items-baseline gap-4">
                            <p className={`text-3xl font-bold ${productDetails?.salePrice > 0 ? 'text-muted-foreground line-through' : 'text-primary'}`}>
                                ${productDetails?.price}
                            </p>
                            {productDetails?.salePrice > 0 && (
                                <p className="text-3xl font-bold text-primary">
                                    ${productDetails.salePrice}
                                </p>
                            )}
                        </div>

                        <Button onClick={() => console.log(productDetails?._id)} className="w-full py-6 text-lg font-semibold hover:opacity-90 transition-opacity">
                            Add to Cart
                        </Button>
                    </div>
                    <div className="mt-6 flex-gap-2">
                        <Input placeholder="write a review" />
                        <Button>summit</Button>
                    </div>
                </div>

                <div className="mt-8">
                    <Separator className="mb-6" />
                    <div className="flex  space-y-6">
                        <h2 className="text-xl font-bold">Reviews</h2>
                        <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4">
                            <div className="flex gap-4 items-start bg-gray-50 p-4 rounded-lg">
                                <Avatar className="w-12 h-12 border-2 border-primary/10">
                                    <AvatarFallback className="bg-primary/5 text-primary">
                                        YR
                                    </AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-lg">Yael Ruiz</h3>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                                        ))}
                                    </div>
                                    <p className="text-muted-foreground text-sm">
                                        This is an awesome plushie
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ProductDetailsDialog;