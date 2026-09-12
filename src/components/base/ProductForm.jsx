import { Label, Textarea, TextInput, Button } from "flowbite-react";
import { useEffect, useState } from "react"

export default function ProductForm({ onSubmit, isLoading, editData }) {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: ''
    });

    useEffect(() => {
        if (editData) {
            setFormData({
                title: editData.title,
                description: editData.description,
                price: editData.price
            });
        } else {
            setFormData({
                title: '',
                description: '',
                price: ''
            });
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
        <div className="w-full px-4 py-8 sm:px-6">
            <h1>{editData ? 'Edit Product' : 'Add Product'}</h1>
            <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="title" value="Product Title" />
                    </div>
                    <TextInput
                        id="title"
                        name="title"
                        placeholder='Input title'
                        onChange={handleChange}
                        value={formData.title}
                        required
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="price" value="Price ($)" />
                    </div>
                    <TextInput
                        id="price"
                        name="price"
                        type="number"
                        placeholder='Input price'
                        onChange={handleChange}
                        value={formData.price}
                        required
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="description" value="Description" />
                    </div>
                    <Textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>

                <Button type="submit" className="bg-cyan-700 hover:bg-cyan-800">
                    {isLoading ? 'Loading...' : editData ? 'Update Product' : 'Create Product'}
                </Button>
            </form>
        </div>
    )
}