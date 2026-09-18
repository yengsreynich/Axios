import api from "../api/apiFetch";

export const baseUrl = import.meta.env.VITE_BASE_URL;

export const getAllProducts = async () => {
  const response = await api.get(`${baseUrl}products`);
  return response.data.products;
};

export async function getProductById(id) {
  const response = await api.get(`${baseUrl}products/${id}`);
  return response.data;
}

export async function createProduct(payload) {
  const response = await api.post(`${baseUrl}products/add`, payload);
  return response.data;
}

export async function deleteProduct(id) {
  const response = await api.delete(`${baseUrl}products/${id}`);
  return response.data;
}

export async function updateProduct(id, payload) {
  const response = await api.put(`${baseUrl}products/${id}`, payload);
  return response.data;
}