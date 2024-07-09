import { apiClient } from "..";

export const addNewsletter = async (data: any) => {
    const response = await apiClient.post(`/newsletter`, data);
    return response?.data
};

export const updateNewsLetter = async (data: any) => {
    const { id, name, content } = data
    const response = await apiClient.put(`/newsletter/${id}`, { name, content });
    return response?.data
};