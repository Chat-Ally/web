import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/component"
import { useState } from "react"

export function CreateProductDialog({
  onProductCreated,
  businessId
}: {
  onProductCreated: (newProduct: any) => void,
  businessId: number
}) {
  const supabase = createClient()

  const [open, setOpen] = useState(false)
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')

  async function uploadProduct() {
    const { data, error } = await supabase
      .from('products')
      .insert([{
        name: productName,
        image_url: productDescription,
        price: productPrice,
        business_id: businessId
      }])
      .select()
    if (data) {
      console.log('new product', data[0])
      onProductCreated(data[0])
      setOpen(false)
    }
    if (error) console.error(error)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Crear nuevo producto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear producto</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right ">
              Name
            </Label>
            <Input
              id="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Nombra tu producto"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Descripcion
            </Label>
            <Input
              id="username"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              placeholder="Describe tu producto"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Precio
            </Label>
            <Input
              id="price"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              type="number"
              placeholder=""
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => uploadProduct()} >Guardar Producto</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}