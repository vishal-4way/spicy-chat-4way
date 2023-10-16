import axios from 'axios';
import {BASE_URL, VITE_CHAT_URL} from '@env';
class JsonApiService {
  constructor() {
    this.userToken = null;
    this.guestUserId = null;
  }
  setUserToken(token) {
    this.userToken = token;
  }
  setGuestUserId(id) {
    this.guestUserId = id;
  }
  getHeaders() {
    let headers = {};
    if (this.userToken) headers['Authorization'] = `Bearer ${this.userToken}`;
    if (this.guestUserId) headers['X-Guest-UserId'] = this.guestUserId;
    headers['x-app-id'] = 'spicychat_application';
    return headers;
  }
  async fetchResource(resource, id = null, params = {}) {
    try {
      const url = id
        ? `${BASE_URL}/${resource}/${id}`
        : `${BASE_URL}/${resource}`;
      const response = await axios.get(url, {
        params,
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching resource: ${error}`);
      throw error;
    }
  }
  async createResource(resource, data) {
    try {
      const response = await axios.post(`${BASE_URL}/${resource}`, data, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error creating resource: ${error}`);
      throw error;
    }
  }
  async updateUser(data) {
    try {
      const response = await axios
        .patch(`${BASE_URL}/users`, data, {headers: this.getHeaders()})
        .catch(error => {
          throw new Error(error.response.data.error);
        });
      return response.data;
    } catch (error) {
      console.error(`Error updating resource: ${error}`);
      throw error;
    }
  }
  async deleteResource(resource, id = null) {
    try {
      let url = `${BASE_URL}/${resource}`;
      if (id) {
        url = `${BASE_URL}/${resource}/${id}`;
      }
      const response = await axios.delete(url, {headers: this.getHeaders()});
      return response;
    } catch (error) {
      console.error(`Error deleting resource: ${error}`);
      throw error;
    }
  }
  async getCharacter(characterId, params = {}) {
    let url = `${BASE_URL}/characters/${characterId}`;
    try {
      const response = await axios.get(url, {headers: this.getHeaders()});
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getCharacterMessages(characterId, conversation_id) {
    let url = `${BASE_URL}/characters/${characterId}/messages?limit=50&`;
    if (conversation_id) {
      url = `${BASE_URL}/characters/${characterId}/messages/${conversation_id}`;
    }
    try {
      const response = await axios.get(url, {headers: this.getHeaders()});
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async chat(data) {
    try {
      const response = await axios.post(VITE_CHAT_URL, data, {
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
  async getconversation(characterId, params = {}) {
    let url = `${BASE_URL}/characters/${characterId}/conversations`;
    try {
      const response = await axios.get(url, {headers: this.getHeaders()});
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getChats() {
    let url = `${BASE_URL}/conversations?limit=25`;
    try {
      const response = await axios.get(url, {headers: this.getHeaders()});
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async WaitingQueues(params = {}) {
    try {
      const url = `https://4mpanjbsf6.execute-api.us-east-1.amazonaws.com/queue`;
      const response = await axios.get(url, {
        params,
        headers: this.getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching resource: ${error}`);
      throw error;
    }
  }
}
const jsonApiService = new JsonApiService();
export default jsonApiService;
