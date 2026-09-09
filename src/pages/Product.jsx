// src/pages/product/Product.jsx
import { useEffect, useState } from 'react';
import ProductCard from '../components/base/ProductCard';
import { getAllProducts } from '../services/productApi';

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch all data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);  
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  return (
    <div className='w-full px-4 py-8 sm:px-6'>
      <h1 className='font-bold text-3xl mb-8'>Product Page</h1>
      
      <div className="flex flex-col gap-8">
        {/* Create Form */}
        <div className="w-full">
          
        </div>

        {/* Product Grid */}
        <div className="w-full">
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}