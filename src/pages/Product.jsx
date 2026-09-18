import React from 'react'
import ProductCard from '../components/base/ProductCard'
import { getAllProducts } from '../services/productApi';

export default function Product() {
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className='w-full px-4 py-4 sm:px-6'>
      <h1 className='font-bold text-3xl'>Product Page</h1>

      <div className='mt-4 grid grid-cols-4 gap-4'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}