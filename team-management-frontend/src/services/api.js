import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

export const getTeamMembers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}team-members/`);
        return response.data;
      } catch (error) {
        console.error("Error fetching team members:", error);
        throw error;
      }
};

export const getTeamMemberById = async (id) => {
    const response = await axios.get(`${API_BASE_URL}team-members/${id}/`)
    return response.data;
};

export const createTeamMember = async (data) => {
    const response = await axios.post(`${API_BASE_URL}team-members/`, data)
    return response.data;
};

export const updateTeamMember = async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}team-members/${id}/`, data);
    return response.data;
};
  
export const deleteTeamMember = async (id) => {
    await axios.delete(`${API_BASE_URL}team-members/${id}/`);
};