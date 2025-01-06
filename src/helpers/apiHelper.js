/**
 * Helper function to fetch data from the API using the base URL defined in the environment variables.
 * This function handles errors and allows for additional options like headers and method configuration.
 * 
 * @param {string} endpoint - The specific endpoint to call (e.g., '/posts', '?search=term').
 * @param {object} options - Additional fetch options (e.g., headers, method, body).
 * @returns {Promise<any>} - The JSON response from the API.
 * @throws {Error} - Throws an error if the fetch request fails or the response is not ok.
 */
export const fetchFromApi = async (endpoint = '', options = {}) => {
    // Retrieve the base URL from the environment variable
    const baseUrl = import.meta.env.PUBLIC_API_URL;
  
    // Ensure the base URL is defined
    if (!baseUrl) {
      throw new Error('PUBLIC_API_URL is not defined in the environment variables.');
    }
  
    try {
      // Combine the base URL with the endpoint to form the full API URL
      const response = await fetch(`${baseUrl}${endpoint}`, options);
  
      // Check if the response status indicates success (200-299)
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      // Parse and return the JSON response
      const data = await response.json();
      return data;
    } catch (error) {
      // Log the error message for debugging purposes
      console.error('Error fetching from API:', error.message);
  
      // Re-throw the error to be handled by the calling function
      throw error;
    }
  };
  