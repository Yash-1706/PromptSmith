import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ai';

const getToken = () => localStorage.getItem('token');

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const testPrompt = async (data) => {
  const response = await axios.post(`${API_URL}/test`, data, getConfig());
  return response.data;
};

const refinePrompt = async (data) => {
  const response = await axios.post(`${API_URL}/refine`, data, getConfig());
  return response.data;
};

const evaluatePrompt = async (data) => {
  const response = await axios.post(`${API_URL}/evaluate`, data, getConfig());
  return response.data;
};

export { testPrompt, refinePrompt, evaluatePrompt };