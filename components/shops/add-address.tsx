import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { DialogTitle } from '../ui/dialog';

interface FormErrors {
    firstName?: string;
    lastName?: string;
    streetAddress?: string;
    state?: string;
    name?: string;
    addressLine1?: string;
    city?: string;
    zipCode?: string;
    country?: string;
}

function ShippingAddressForm({
    onClickNext
}: {
    onClickNext: () => void
}) {
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: '', // Default country
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const handleStateChange = (value: string) => {
        setAddress((prevAddress) => ({
            ...prevAddress,
            state: value,
        }));
        console.log(address)
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        // Validation (basic example - expand as needed)
        let isValid = true;
        if (!address.firstName) {
            setErrors({ ...errors, firstName: 'First name is required' });
            isValid = false;
        }
        if (!address.lastName) {
            setErrors({ ...errors, lastName: 'Last name is required' });
            isValid = false;
        }
        if (!address.streetAddress) {
            setErrors({ ...errors, streetAddress: 'Street address is required' });
            isValid = false;
        }
        if (!address.city) {
            setErrors({ ...errors, city: 'City is required' });
            isValid = false;
        }
        if (!address.state) {
            setErrors({ ...errors, state: 'State is required' });
            isValid = false;
        }
        if (!address.zipCode) {
            setErrors({ ...errors, zipCode: 'Zip code is required' });
            isValid = false;
        }

        if (isValid) {
            // Handle form submission (e.g., send to API)
            console.log('Shipping Address:', address);
            // Reset form
            setAddress({
                firstName: '',
                lastName: '',
                streetAddress: '',
                city: '',
                state: '',
                zipCode: '',
                country: '',
            });
            setErrors({}); // Clear errors
            onClickNext()
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <DialogTitle>Dirección de Envío</DialogTitle>

            <div className='grid gap-6 sm:grid-cols-2'>
                <div>
                    <Label htmlFor="firstName">
                        Nombre:
                    </Label>
                    <Input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={address.firstName}
                        onChange={handleChange}
                    />
                    {errors.firstName && <span className="error">{errors.firstName}</span>}
                </div>
                <div>
                    <Label htmlFor="lastName">
                        Apellido:
                    </Label>
                    <Input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={address.lastName}
                        onChange={handleChange}
                    />
                    {errors.lastName && <span className="error">{errors.lastName}</span>}
                </div>
            </div>

            <Label htmlFor="streetAddress">
                Dirección:
            </Label>
            <Input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={address.streetAddress}
                onChange={handleChange}
            />
            {errors.streetAddress && <span className="error">{errors.streetAddress}</span>}

            <div className='grid gap-6 sm:grid-cols-3 grid-cols-2'>
                <div>
                    <Label htmlFor="city">
                        Ciudad:
                    </Label>
                    <Input
                        type="text"
                        id="city"
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                    />
                    {errors.city && <span className="error">{errors.city}</span>}
                </div>
                <div>
                    <Label htmlFor="state">
                        Estado:
                    </Label>
                    <Select value={address.state} onValueChange={handleStateChange}>
                        <SelectTrigger >
                            <SelectValue placeholder="Estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Aguascalientes">Aguascalientes</SelectItem>
                            <SelectItem value="Baja California Sur">Baja California Sur</SelectItem>
                            <SelectItem value="Campeche">Campeche</SelectItem>
                            <SelectItem value="Chiapas">Chiapas</SelectItem>
                            <SelectItem value="Chihuahua">Chihuahua</SelectItem>
                            <SelectItem value="Coahuila de Zaragoza">Coahuila de Zaragoza</SelectItem>
                            <SelectItem value="Colima">Colima</SelectItem>
                            <SelectItem value="Durango">Durango</SelectItem>
                            <SelectItem value="Guanajuato">Guanajuato</SelectItem>
                            <SelectItem value="Guerrero">Guerrero</SelectItem>
                            <SelectItem value="Hidalgo">Hidalgo</SelectItem>
                            <SelectItem value="Jalisco">Jalisco</SelectItem>
                            <SelectItem value="Estado de México">Estado de México</SelectItem>
                            <SelectItem value="Michoacán de Ocampo">Michoacán de Ocampo</SelectItem>
                            <SelectItem value="Morelos">Morelos</SelectItem>
                            <SelectItem value="Nayarit">Nayarit</SelectItem>
                            <SelectItem value="Nuevo León">Nuevo León</SelectItem>
                            <SelectItem value="Oaxaca de Juárez">Oaxaca de Juárez</SelectItem>
                            <SelectItem value="Puebla">Puebla</SelectItem>
                            <SelectItem value="Querétaro Arteaga">Querétaro Arteaga</SelectItem>
                            <SelectItem value="Quintana Roo">Quintana Roo</SelectItem>
                            <SelectItem value="San Luis Potosí">San Luis Potosí</SelectItem>
                            <SelectItem value="Sinaloa">Sinaloa</SelectItem>
                            <SelectItem value="Sonora">Sonora</SelectItem>
                            <SelectItem value="Tabasco">Tabasco</SelectItem>
                            <SelectItem value="Tamaulipas">Tamaulipas</SelectItem>
                            <SelectItem value="Tlaxcala">Tlaxcala</SelectItem>
                            <SelectItem value="Veracruz de Ignacio de la Llave">Veracruz de Ignacio de la Llave</SelectItem>
                            <SelectItem value="Yucatán">Yucatán</SelectItem>
                            <SelectItem value="Zacatecas">Zacatecas</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.state && <span className="error">{errors.state}</span>}
                </div>
                <div>
                    <Label htmlFor="zipCode">
                        Código Postal:
                    </Label>
                    <Input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={address.zipCode}
                        onChange={handleChange}
                    />
                    {errors.zipCode && <span className="error">{errors.zipCode}</span>}
                </div>
            </div>

            {/* <Label htmlFor="country">
                País:
            </Label>
            <select id="country" name="country" value={address.country} onChange={handleChange}>
                <option value="México">México</option>
            </select> */}

            <div className='mt-4'>
                <Button type="submit">Submit Address</Button>
            </div>
        </form>
    );
}

export default ShippingAddressForm;