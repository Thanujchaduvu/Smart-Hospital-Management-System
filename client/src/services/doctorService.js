import axios from "axios";

const API = "${import.meta.env.VITE_API_URL}/api/doctors";

export const getDoctors = () => axios.get(API);

export const addDoctor = (doctor) =>
  axios.post(API, doctor);

export const deleteDoctor = (id) =>
  axios.delete(`${API}/${id}`);

export const updateDoctor = (id, doctor) =>
  axios.put(`${API}/${id}`, doctor);