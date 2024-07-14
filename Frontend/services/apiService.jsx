import axios from './axiosConfig';

const API_URL = 'https://note-trove.azurewebsites.net';
export const getProfileData = async () => {
  try {
    const response = await axios.get('/api/Upload/Profile');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch profile data:', error);
    throw error;
  }
};

export const addPost = async (description, lessonName, document) => {
    try {
      const response = await axios.post(`${API_URL}/api/Upload`, {
        description: description,
        lessonName: lessonName,
        document: document,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to add post:', error);
      throw error;
    }
  };

  export const getPosts = async () => {
    try {
      const response = await axios.get('/api/Upload/MainPageGet');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      throw error;
    }
  };
