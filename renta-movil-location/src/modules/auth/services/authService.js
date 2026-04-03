import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // cambia por tu URL real

export const registrarUsuario = async (datosUsuario) => {
  const response = await axios.post(`${API_URL}/auth/registro`, datosUsuario);
  return response.data;
};