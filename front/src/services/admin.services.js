import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const createAdmin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};