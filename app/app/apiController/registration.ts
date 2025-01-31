import axios from 'axios';

interface RegisterResponse {
  jwt: string;
    user: {
      id: number;
      documentId: string;
      username: string;
      email: string;
    };
}

const registerUser = async (username: string, email: string, password: string): Promise<RegisterResponse | null> => {
  try {
    const response = await axios.post<RegisterResponse>(
      'http://localhost:1337/api/auth/local/register',
      {
        username,
        email,
        password,
      }
    );

    return response.data;
  } catch (error: any) {
    return null;
  }
};


export default registerUser;