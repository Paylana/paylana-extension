import { userService } from '@src/store/services/user.service'
import axios from 'axios';
const dataAPI = {
  email: '1211ttt11@gmail.com',
  password: 'Minh@3264vnm',
  confirm_password: 'Minh@3264vnm',
}
const apiUrl = 'https://tram-connect-stag.atomsolution.vn/v1/api/user/auth/create-password';

describe('POST /v1/api/auth/create-password', () => {
  const testData = {
    email: 't121233123est@gmail.com',
    password: 'Minh@3264vnm',
    confirm_password: 'Minh@3264vnm',
  };

  it('should create a password successfully', async () => {
    const response = await axios.post(apiUrl, testData);
    
    expect(response.status).toBe(201);
  });

  it('should handle invalid data gracefully', async () => {
    // Example of a test with invalid data
    const invalidData = {
      email: 'invalid-email',
      password: 'password',
      confirm_password: 'password',
    };

    try {
      await axios.post(apiUrl, invalidData);
    } catch (error) {
      expect(error.response.status).toBe(400); // Adjust this status code based on your API's behavior
      // Add more assertions for error response as needed
    }
  });
});
