import axios from 'axios';

const API_URL = 'http://localhost:5000/api/prompts';

const getToken = () => localStorage.getItem('token');

const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const getPrompts = async () => {
  const response = await axios.get(API_URL, getConfig());
  return response.data;
};

const getPrompt = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getConfig());
  return response.data;
};

const createPrompt = async (promptData) => {
  const response = await axios.post(API_URL, promptData, getConfig());
  return response.data;
};

const updatePrompt = async (id, promptData) => {
  const response = await axios.put(`${API_URL}/${id}`, promptData, getConfig());
  return response.data;
};

const deletePrompt = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getConfig());
  return response.data;
};

export { getPrompts, getPrompt, createPrompt, updatePrompt, deletePrompt };