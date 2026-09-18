import api from "../api/apiFetch";
import useAuthStore from "../store/authStore";

export async function login(payload) {
    const response = await api.post('/auth/login', payload);
    useAuthStore.getState().setToken(response.data.accessToken);
    
    return response.data;
}