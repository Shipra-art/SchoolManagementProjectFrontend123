import api from "./axios";

// Get notifications
export const getNotifications = async (userId) => {
    const response = await api.get(`/Notification/${userId}`);
    return response.data;
};

// Mark notification as read
export const markAsRead = async (id) => {
    const response = await api.put(`/Notification/read/${id}`);
    return response.data;
};