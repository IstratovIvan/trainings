interface AuthResponse {
    jwt: string;
    user: {
      id: number;
      documentId: string;
      username: string;
      email: string;
    };
  }
  
async function loginToStrapi(identifier: string, password: string): Promise<AuthResponse | null> {
    const response = await fetch('http://localhost:1337/api/auth/local', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });
  
    if (!response.ok) {
      return null;
    }
  
    return response.json();
}

export default loginToStrapi;