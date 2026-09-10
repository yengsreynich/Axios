export const baseUrl = import.meta.env.VITE_BASE_URL;

export async function getAllProducts() {
    const response = await fetch(`${baseUrl}/products`)
        .then((res) => res.json())

    return response?.products;
}

export async function getProductById(id) {
     const response = await fetch(`${baseUrl}/products/${id}`).then((res) => res.json());
     return response;
}

export async function createProduct(payload) {
    const response = await fetch(`${baseUrl}/products/add`, {
        method: 'POST', // Sends a POST request (creates data on the server)
        headers: {
            'Content-Type': 'application/json', // tell server data is in JSON format
        },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    return data;
}

export async function deleteProduct(id) {
    const response = await fetch(`${baseUrl}/products/${id}`, {
        method: 'DELETE'
    });

    const data = await response.json();
    return data;
}
