import React, { useEffect, useState } from 'react'
import { Button, Checkbox, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import ProductForm from '../components/base/ProductForm'
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../services/productApi'
import { Info } from 'lucide-react';

function AddProduct() {
    const [isLoading, setLoading] = useState(false);
    const [product, setProduct] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [editData, setEditData] = useState(null);
    
    // fetch all data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setProduct(response);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    // create function
    const handleSubmit = async (formData) => {
        try {
            setLoading(true)
            if (editData) {
                // update product
                const updateProduct = await updateProduct(editData.id, formData);
                setProduct((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === editData.id ? updateProduct : product
                    )
                );
                setEditData(null);
            } else {
                const newProduct = await createProduct(formData);
                setProduct((prevProducts) => [newProduct, ...prevProducts]); 
            }
        } catch (error) {
             if (editData) {
                setProduct((currentProducts) =>
                    currentProducts.map((p) => p.id === editData.id ? { ...p, ...formData } : p)
                );
                setEditData(null);
            }    
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (productId) => {
        try {
            const response = await deleteProduct(productId);
            console.log(response);
        } catch (error) {
            console.error('Error deleting product:', error);
        } finally {
            setProduct((product) => product.filter((p) => p.id !== productId));
            setDeleteId(null);
        }
    } 

    return (
        <div>
            <ProductForm onSubmit={handleSubmit} isLoading={isLoading} editData={editData} />
            {product.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table hoverable>
                        <TableHead>
                            <TableRow>
                                <TableHeadCell>ID</TableHeadCell>
                                <TableHeadCell>Title</TableHeadCell>
                                <TableHeadCell>Price</TableHeadCell>
                                <TableHeadCell>Description</TableHeadCell>
                                <TableHeadCell>Actions</TableHeadCell>
                            </TableRow>
                        </TableHead>
                        <TableBody className="divide-y">
                            {product.map((product) => (
                                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800" key={product.id}>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {product.id}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {product.title}
                                    </TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className='flex gap-2'>
                                        <Button className='cursor-pointer' onClick={() => setEditData(product)}>Edit</Button>
                                        <Button color="red" className='cursor-pointer' onClick={() => setDeleteId(product.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <p className="text-center text-gray-500">No products.</p>
            )}

            <Modal show={deleteId !== null} size="md" onClose={() => setDeleteId(null)} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="text-center">
                        <Info />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="red" onClick={() => handleDelete(deleteId)}>
                                Yes, I'm sure
                            </Button>
                            <Button color="alternative" onClick={() => setDeleteId(null)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default AddProduct