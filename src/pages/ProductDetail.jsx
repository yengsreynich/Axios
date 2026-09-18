import { useParams, Link } from "react-router";
import { getProductById } from "../services/productApi";
import { useEffect, useState } from "react";
import api from "../api/apiFetch";

export default function ProductDetail() {
  // 1 get id from url params
  const { id } = useParams();
  // store product detail in local state
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-500">
        Loading product detail...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center text-red-500">Product not found!</div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link
        to="/products"
        className="text-cyan-700 hover:underline mb-6 inline-block"
      >
        &larr; Back to Products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />

        <div>
          <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 text-lg mb-4">{product.description}</p>

          <div className="text-3xl font-bold text-gray-900 mb-6">
            ${product.price}
          </div>

          <div className="text-3xl font-bold text-gray-900 mb-6">
            {product.stock} in stock
          </div>

          <button className="w-full rounded-lg bg-cyan-700 px-5 py-3 text-white font-semibold hover:bg-cyan-800">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
