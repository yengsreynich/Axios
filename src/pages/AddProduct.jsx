import React, { useState } from 'react'
import { Checkbox, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import ProductForm from '../components/base/ProductForm'
import { createProduct } from '../services/productApi'

function AddProduct() {
    const [isLoading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);

    const handleSubmit = async (formData) => {
        try {
            setLoading(true)
            const newProduct = await createProduct(formData);
            setProduct((prevProducts) => [newProduct, ...prevProducts]);
        } catch (error) {
            throw new Error('Error creating product:', error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <div>
            <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
            {product.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>Title</TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                                <TableHeadCell>Description</TableHeadCell>
                                <TableHeadCell>
                                    <span className="sr-only">Edit</span>
                                </TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {product.map((product) => (
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {product.title}
                                    </TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No products.</p>
            )}
        </div>
    )
}

export default AddProduct
